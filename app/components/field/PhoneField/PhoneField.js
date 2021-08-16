/**
 * Field text untuk input dengan format no. hp atau telepon
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'PhoneField',
    props: {
        value: String | Number,
        placeholder: String,
        height: String | Number,
        dense: {
            type: Boolean,
            default: true
        },
        label: String,
        backgroundColor: String,
        color: String,
        appendIcon: String,
        errorMessages: Array,
        rules: Array,
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
        currency: {
            type: String | Number,
            default: 1
        }
    },
    mounted () {
        if (this.value) {
            this.input(this.value.toString())
        } else {
            this.input(null)
        }
    },
    data () {
        return {
            display: null
        }
    },
    computed: {
        textField () {
            return {
                value: this.display,
                dense: this.dense,
                label: this.label,
                md: this.md,
                height: this.height,
                placeholder: this.placeholder,
                appendIcon: this.appendIcon,
                backgroundColor: this.backgroundColor,
                color: this.color,
                errorMessages: this.errorMessages,
                rules: this.rules,
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly,
                maxLength: 18
            }
        }
    },
    methods: {
        input ($event) {
            if ($event) {
                const splitDash = $event.replace(/[^-0-9]/, '').split('-')
                const realValue = splitDash.join('').substring(0, 15)
                const arrayValue = realValue.replace(/[^0-9]/, '').split('')

                let resultValue = ''
                arrayValue.forEach((item, index) => {
                    const position = index + 1
                    if (position % 4 === 0 && position !== arrayValue.length) {
                        resultValue += (item + '-')
                    } else {
                        resultValue += item
                    }
                })
                this.display = resultValue

                this.$emit('input', realValue)
            } else {
                this.display = null
                this.$emit('input', null)
            }
        },
        keydown ($event) {
            if ($event.key && !['Backspace', 'Delete'].includes($event.key) && $event.key.match(/[a-zA-Z]/g)) {
                $event.preventDefault()
            }

            this.$emit('keydown', $event)
        }
    },
    watch: {
        value (val, old) {
            if (val && val !== old) {
                this.input(val.toString())
            }
            if (val === null) {
                this.input(null)
            }
        }
    }
}
