import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
import 'vue-upload-component/dist/vue-upload-component.part.css'

/**
 * Field untuk upload area untuk gambar menggunakan vue-upload-component
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'UploadAreaField',
    components: {
        FileUpload
    },
    async created () {
        await this.loadInitialFile()
    },
    props: {
        value: Object,
        label: String,
        placeholder: {
            type: String,
            default: 'Pilih file untuk diunggah (jpg, jpeg, png)'
        },
        type: {
            type: Array,
            default: () => (['jpg', 'jpeg', 'png'])
        },
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
        },
        labelMd: {
            type: String | Number,
            default: 3
        }
    },
    data () {
        return {
            flagLoadFile: true,
            error: false,
            file: this.value,
            selected: false,
            loaded: false,
            preview: false,
            fileTypeError: null
        }
    },
    computed: {
        buttonClass () {
            return [
                'v-card--outlined',
                'v-sheet',
                'v-sheet--tile',
                'grey',
                'lighten-2',
                'd-flex',
                'upload-area'
            ]
        },
        editClass () {
            return [
                'v-btn',
                'v-btn--depressed',
                'v-btn--flat',
                'v-btn--icon',
                'v-btn--outlined',
                'v-btn--round',
                'v-size--default',
                'pa-1'
            ]
        },
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
        input ($event) {
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
                    this.file = $event
                    this.file = {
                        ...this.file,
                        url: URL.createObjectURL(this.file.file)
                    }
                    this.$emit('input', this.file)
                }
            }
        },
        clear () {
            this.file = {
                file: null,
                name: null,
                url: null
            }
            this.fileTypeError = null
            this.selected = this.loaded = false
            this.$emit('input', this.file)
        },
        async loadInitialFile () {
            if (this.value && this.flagLoadFile && this.value.url && this.value.url.includes('http') && !this.value.file) {
                try {
                    const blob = await this.$axios.$get(this.value.url, {
                        responseType: 'blob'
                    })

                    const splitUrl = this.value.url.split('/')
                    this.file = {
                        ...this.value,
                        file: new File([blob], splitUrl[splitUrl.length - 1]),
                        name: splitUrl[splitUrl.length - 1]
                    }
                    this.flagLoadFile = true
                } catch (e) {
                    this.file = {
                        ...this.value,
                        file: null,
                        name: null,
                        url: '/images/icon/broken-files.png'
                    }
                    this.flagLoadFile = false
                }
                this.$emit('input', this.file)
            }
        }
    },
    watch: {
        async value (val, old) {
            if (val.url) {
                if (!old || val.url !== old.url) {
                    this.flagLoadFile = true
                }

                await this.loadInitialFile()
            } else {
                this.file = {
                    file: null,
                    name: null,
                    url: null
                }
                this.flagLoadFile = false
            }
        }
    }
}
