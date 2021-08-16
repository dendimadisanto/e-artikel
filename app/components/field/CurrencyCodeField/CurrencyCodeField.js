export default {
    name: 'CurrencyCodeField',
    props: {
        value: String | Object,
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
            default: 2
        }
    },
    mounted () {
        if (!this.value) {
            this.$emit('input', 1)
        } else {
            this.$emit('input', this.value)
        }
    },
    data: () => ({
        currency_code: [
            {
                id: 1,
                code: 'IDR'
            },
            {
                id: 2,
                code: 'USD'
            },
            {
                id: 3,
                code: 'SAR'
            }
        ]
    }),
    computed: {
        selectField () {
            return {
                items: this.currency_code,
                itemText: 'code',
                itemValue: 'id',
                value: this.value ? this.value : 1,
                label: this.label,
                md: this.md,
                dense: this.dense,
                height: this.height,
                placeholder: this.placeholder,
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                hideDetails: 'auto',
                errorMessages: this.errorMessages,
                rules: this.validationRules,
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly
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
        input ($event) {
            this.$emit('input', $event)
        }
    }
}
