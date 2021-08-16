import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
import 'vue-upload-component/dist/vue-upload-component.part.css'

/**
 * Field untuk upload gambar (bisa lebih dari satu) menggunakan vue-upload-component
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'ImagesUploadField',
    components: {
        FileUpload
    },
    props: {
        value: Array,
        placeholder: {
            type: String,
            default: 'Pilih file untuk diupload (jpg, jpeg, png)'
        },
        type: {
            type: Array,
            default: () => (['jpg', 'jpeg', 'png'])
        },
        justifyCards: {
            type: String,
            default: 'start'
        },
        max: String | Number,
        label: String,
        errorMessages: Array,
        rules: Array,
        required: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        md: {
            type: String | Number,
            default: 9
        }
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
            selected: null,
            preview: false,
            preview_url: null,
            fileTypeError: null
        }
    },
    computed: {
        errors () {
            let errors = this.errorMessages ? [...this.errorMessages] : []

            if (this.fileTypeError) {
                errors = [
                    ...errors,
                    this.fileTypeError
                ]
            }

            return errors
        }
    },
    methods: {
        showPreview (url) {
            this.preview = true
            this.preview_url = url
        },
        input ($event) {
            if ($event) {
                this.flagLoadFile = false
                let files = []
                const errorMessage = 'Terdapat file bukan bertipe ' + this.type.join(', ')
                let countError = 0

                $event.forEach((item) => {
                    let error = false
                    switch (item.type) {
                    case 'image/png':
                        if (!this.type.includes('png')) {
                            countError++
                            error = true
                        }
                        break
                    case 'image/jpeg':
                        if (!this.type.includes('jpg') || !this.type.includes('jpeg')) {
                            countError++
                            error = true
                        }
                        break
                    default:
                        countError++
                        error = true
                    }

                    if (!error) {
                        files = [
                            ...files,
                            {
                                ...item,
                                url: item.url ? item.url : URL.createObjectURL(item.file)
                            }
                        ]
                    }
                })

                if (countError === 0) {
                    this.fileTypeError = null
                } else {
                    this.fileTypeError = errorMessage
                }
                this.files = [...files]
                this.$emit('input', this.files)
            }
        },
        update ($event, index) {
            if ($event) {
                const errorMessage = 'File harus bertipe ' + this.type.join(', ')
                switch ($event.type) {
                case 'image/png':
                    if (!this.type.includes('png')) {
                        this.fileTypeError = errorMessage
                    } else {
                        this.fileTypeError = null
                    }
                    break
                case 'image/jpeg':
                    if (!this.type.includes('jpg') || !this.type.includes('jpeg')) {
                        this.fileTypeError = errorMessage
                    } else {
                        this.fileTypeError = null
                    }
                    break
                default:
                    this.fileTypeError = errorMessage
                }

                if (!this.fileTypeError) {
                    this.flagLoadFile = false
                    const newFiles = [...this.files]
                    newFiles[index] = {
                        ...$event,
                        url: URL.createObjectURL($event.file)
                    }

                    this.files = [...newFiles]
                    this.$emit('input', this.files)
                }
            }
        },
        remove (index) {
            this.flagLoadFile = false
            this.files.splice(index, 1)
            this.$emit('input', this.files)
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
                } else if (!item.url && !item.file) {
                    return {
                        ...item,
                        file: null,
                        name: null,
                        url: '/images/icon/broken-files.png'
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
