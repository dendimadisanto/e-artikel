import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
import 'vue-upload-component/dist/vue-upload-component.part.css'

/**
 * Field untuk upload satu file menggunakan vue-upload-component
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'SingleUploadFieldAutoUpload',
    components: {
        FileUpload
    },
    props: {
        value: Object,
        placeholder: {
            type: String,
            default: 'Pilih file untuk diupload'
        },
        height: String | Number,
        dense: {
            type: Boolean,
            default: true
        },
        label: String,
        color: {
            type: String,
            default: 'grey white--text'
        },
        onupload: Function,
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
            default: 5
        }
    },
    async created () {
        await this.loadInitialFile()
    },
    data () {
        return {
            flagLoadFile: true,
            error: false,
            file: this.value,
            name: null
        }
    },
    computed: {
        fileName () {
            return this.file ? this.file.name : null
        },
        vTextField () {
            return {
                value: this.fileName,
                dense: this.dense,
                height: this.height,
                placeholder: this.placeholder,
                outlined: true,
                backgroundColor: 'white',
                readonly: true,
                clearable: true,
                hideDetails: !this.errorMessages || this.errorMessages.length === 0,
                errorMessages: this.errorMessages,
                rules: this.rules,
                required: this.required
            }
        }
    },
    methods: {
        input ($event) {
            if ($event) {
                this.flagLoadFile = false
                this.file = $event
                this.file = {
                    ...this.file,
                    url: URL.createObjectURL(this.file.file)
                }
                this.$emit('input', this.file)
                this.$props.onupload()
            }
        },
        clear () {
            this.file = null
            this.$emit('input', null)
        },
        async loadInitialFile () {
            if (this.value && this.flagLoadFile && this.value.url && !this.value.file) {
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
                        name: null
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
