/**
 * Field untuk memilih waktu (jam:menit)
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'TimePickerField',
    props: {
        value: String,
        placeholder: String,
        height: String | Number,
        dense: {
            type: Boolean,
            default: true
        },
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
        disabled: {
            type: Boolean,
            default: false
        },
        md: {
            type: String | Number,
            default: 5
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
            display: false,
            displayTime: this.value,
            error: false
        }
    },
    computed: {
        vMenu () {
            return {
                closeOnContentClick: false,
                transition: 'scale-transition',
                offsetY: true,
                nudgeLeft: 10,
                nudgeBottom: 5,
                maxWidth: 290,
                minWidth: 290
            }
        },
        vTextField () {
            return {
                value: this.displayTime,
                dense: this.dense,
                height: this.height,
                placeholder: this.placeholder,
                outlined: true,
                readonly: true,
                clearable: true,
                appendIcon: 'mdi-clock-outline',
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                hideDetails: 'auto',
                errorMessages: this.errorMessages,
                rules: this.validationRules,
                required: this.required,
                disabled: this.disabled
            }
        },
        vTimePicker () {
            return {
                noTitle: true,
                headerColor: 'grey',
                format: '24hr'
            }
        },
        validationRules () {
            let rules = this.rules ? [ ...this.rules ] : []

            if (this.required) {
                rules = [
                    ...rules,
                    v => !!v || (this.label ? this.label + ' harus diisi.' : 'Isian berikut harus diisi.')
                ]
            }

            return rules
        }
    },
    methods: {
        timeSelected ($event) {
            this.$emit('input', $event)
            this.displayTime = $event
            this.display = false
        },
        clear () {
            this.displayTime = null
            this.$emit('input', null)
        },
        input ($event) {
            if (!$event) {
                this.displayTime = null
                this.$emit('input', null)
            }
        },
        blur ($event) {
            if (this.$refs.textField) {
                this.error = this.$refs.textField.hasError
            }
            this.$emit('blur', $event)
        }
    },
    watch: {
        value (val) {
            this.displayTime = val
        }
    }
}
