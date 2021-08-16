/**
 * Field text untuk input dengan format mata uang
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'CurrencyField',
    props: {
        value: String | Number,
        currency: {
            type: String | Number,
            default: 1
        },
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
        appendOuter: String,
        backgroundColor: String,
        color: String,
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
        }
    },
    computed: {
        currencyCode () {
            if (this.currency) {
                const currency = isNaN(parseInt(this.currency)) ? this.currency.toUpperCase() : parseInt(this.currency)
                switch (currency) {
                case 1:
                case 'RP':
                    return 'Rp'
                case 2:
                case '$':
                    return '$'
                case 3:
                case 'SAR':
                    return 'SAR'
                }
            } else {
                return ''
            }
        },
        numberField () {
            return {
                value: this.value,
                type: 'float',
                dense: this.dense,
                label: this.label,
                md: this.md,
                height: this.height,
                placeholder: this.placeholder,
                backgroundColor: this.backgroundColor,
                color: this.color,
                errorMessages: this.errorMessages,
                rules: this.rules,
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly,
                appendOuter: this.appendOuter,
                prepend: this.currencyCode
            }
        }
    },
    methods: {
        input ($event) {
            this.$emit('input', $event)
        },
        keydown ($event) {
            this.$emit('keydown', $event)
        }
    }
}
