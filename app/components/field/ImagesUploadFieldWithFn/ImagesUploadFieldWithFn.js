import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
import 'vue-upload-component/dist/vue-upload-component.part.css'

/**
 * Field untuk upload gambar (bisa lebih dari satu) menggunakan vue-upload-component
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'ImagesUploadFieldWithFn',
    components: {
        FileUpload
    },
    props: {
        value: Array,
        justifyCards: {
            type: String,
            default: 'start'
        },
        label: String,
        errorMessages: Array,
        rules: Array,
        required: {
            type: Boolean,
            default: false
        },
        md: {
            type: String | Number,
            default: 9
        },
        sorting: {
            type: Boolean,
            default: false
        },
        onupload: Function,
        onchange: Function,
        ondelete: Function
    },
    async created () {
        await this.loadInitialFiles()
        this.$emit('input', this.files)
    },
    data () {
        return {
            flagLoadFile: true,
            error: false,
            files: this.value ? this.value : [],
            selected: null
        }
    },
    methods: {
        input ($event) {
            console.log(this.$refs.file)
            if ($event) {
                this.flagLoadFile = false
                this.files = $event.map(item => ({
                    ...item,
                    id: this.files.length,
                    url: item.url ? item.url : URL.createObjectURL(item.file)
                }))

                const formData = new FormData()
                const uploadData = $event.map((item, key) => {
                    return item
                })
                formData.append('file_list', uploadData)
                this.$emit('input', this.files)
                this.$props.onupload()
            }
        },
        update ($event, index) {
            if ($event) {
                this.flagLoadFile = false
                const id = this.files[index].id
                const newFiles = [...this.files]
                newFiles[index] = {
                    ...$event,
                    url: URL.createObjectURL($event.file)
                }

                this.files = [...newFiles]
                this.$emit('input', this.files)
                this.$props.onchange(id)
            }
        },
        remove (index) {
            this.flagLoadFile = false
            const id = this.files[index].id
            this.files.splice(index, 1)
            this.$emit('input', this.files)
            this.$props.ondelete(id)
        },
        async loadInitialFiles () {
            const items = this.value
            if (this.value && this.flagLoadFile) {
                this.files = await this.loadFiles(items)
                this.flagLoadFile = false
                this.$emit('input', this.files)
            }
        },
        loadFiles (items) {
            return Promise.all(items.map(async (item) => {
                if (item.url && item.url.includes('http') && !item.file) {
                    try {
                        const blob = await this.$axios.$get(item.url, {
                            responseType: 'blob'
                        })

                        const splitUrl = item.url.split('/')
                        return {
                            ...item,
                            file: new File([blob], splitUrl[splitUrl.length - 1]),
                            name: splitUrl[splitUrl.length - 1]
                        }
                    } catch (e) {
                        return {
                            ...item,
                            file: null,
                            name: null,
                            url: '/images/icon/broken-files.png'
                        }
                    }
                } else {
                    return item
                }
            }))
        }
    },
    watch: {
        async value (val, old) {
            if (val.length) {
                if (!old || val.map(item => item.url ? item.url : '').join('') !== old.map(item => item.url ? item.url : '').join('')) {
                    this.flagLoadFile = true
                }

                await this.loadInitialFiles()
            } else {
                this.files = []
                this.flagLoadFile = false
            }
        }
    }
}
