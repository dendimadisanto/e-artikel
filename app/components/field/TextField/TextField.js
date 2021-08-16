/**
 * Field text untuk input text pendek
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'TextField',
    props: {
        value: String | Number,
        tile: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        height: String | Number,
        dense: {
            type: Boolean,
            default: true
        },
        label: String,
        maxLength: String | Number,
        trim: {
            type: Boolean,
            default: false
        },
        textStyle: String,
        append: String,
        appendOuter: String,
        appendIcon: String,
        prepend: String,
        prependOuter: String,
        backgroundColor: String,
        color: String,
        errorMessages: Array,
        rules: Array,
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
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
        },
        suffix: {
            type: String,
            default: ''
        }
    },
    mounted () {
        this.$watch(() => {
            return {
                hasInput: this.$refs.textField.hasInput,
                hasError: this.$refs.textField.hasError
            }
        }, (val) => {
            if (val.hasInput) {
                this.error = val.hasError
            }
        })
    },
    data () {
        return {
            error: false
        }
    },
    computed: {
        vTextField () {
            return {
                value: this.value,
                dense: this.dense,
                height: this.height,
                placeholder: this.placeholder,
                outlined: true,
                appendIcon: this.appendIcon,
                backgroundColor: this.background,
                color: this.color,
                hideDetails: 'auto',
                errorMessages: this.errorMessages,
                rules: this.validationRules,
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly,
                maxLength: this.maxLength,
                type: this.type,
                autocomplete: 'off',
                suffix: this.suffix
            }
        },
        validationRules () {
            const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
            const urlRegex = /(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00A1-\uFFFF0-9]-*)*[a-z\u00A1-\uFFFF0-9]+)(?:\.(?:[a-z\u00A1-\uFFFF0-9]-*)*[a-z\u00A1-\uFFFF0-9]+)*(?:\.(?:[a-z\u00A1-\uFFFF]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
            let rules = this.rules ? [...this.rules] : []
            const nikRegex = /^.{16,}$/
            const numberRegex = /[\d]+/i

            if (this.required) {
                rules = [
                    ...rules,
                    v => (!!v || v === 0) || (this.label ? this.label + ' harus diisi.' : 'Isian berikut harus diisi.')
                ]
            }

            switch (this.type) {
            case 'email':
                rules = [
                    ...rules,
                    v => (!v || emailRegex.test(v)) || 'Format Email harus benar.'
                ]
                break
            case 'url':
                rules = [
                    ...rules,
                    v => (!v || urlRegex.test(v)) || 'Format URL harus benar.'
                ]
                break
            case 'nik':
                rules = [
                    ...rules,
                    v => (!v || nikRegex.test(v)) || 'Format NIK harus benar.'
                ]
                break
            case 'number':
                rules = [
                    ...rules,
                    v => (!v || numberRegex.test(v)) || 'Format Angka harus benar.'
                ]
                break
            }

            return rules
        },
        background () {
            if (this.disabled) {
                return 'grey lighten-3'
            }

            if (this.backgroundColor) {
                return this.backgroundColor
            } else {
                return 'white'
            }
        }
    },
    methods: {
        input ($event) {
            if (this.trim) {
                this.$emit('input', $event.replace(/\s/g, ''))
            } else if (this.textStyle === 'uppercase') {
                this.$emit('input', $event.toUpperCase())
            } else if (this.textStyle === 'lowercase') {
                this.$emit('input', $event.toLowerCase())
            } else {
                this.$emit('input', $event)
            }
        },
        keydown ($event) {
            if (this.$refs.textField) {
                this.error = this.$refs.textField.hasError
            }

            if (this.type === 'number' || this.type === 'nik') {
                if ($event.key && !['Backspace', 'Delete'].includes($event.key) && $event.key.match(/[a-zA-Z]/g)) {
                    $event.preventDefault()
                }
            }

            if (this.trim && $event.code === 'Space') {
                $event.preventDefault()
            }

            this.$emit('keydown', $event)
        },
        blur ($event) {
            if (this.$refs.textField) {
                this.error = this.$refs.textField.hasError
            }
            this.$emit('blur', $event)
        },
        click ($event) {
            if (this.$refs.textField) {
                this.error = this.$refs.textField.hasError
            }
            this.$emit('click', $event)
        },
        enter ($event) {
            if (this.$refs.textField) {
                this.error = this.$refs.textField.hasError
            }
            this.$emit('enter', $event)
        },
        change ($event) {
            if (this.$refs.textField) {
                this.error = this.$refs.textField.hasError
            }
            this.$emit('change', $event)
        }
    }
}
