/**
 * Field dropdown autocomplete sehingga bisa di searching dengan mengetikkan beberapa huruf
 * Field ini cocok digunakan untuk pilihan yang banyak
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'AutocompleteField',
    props: {
        items: Array,
        itemText: String,
        itemValue: String,
        value: String | Object,
        placeholder: String,
        height: String | Number,
        dense: {
            type: Boolean,
            default: true
        },
        clearable: {
            type: Boolean,
            default: false
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
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    mounted () {
        this.$watch(() => {
            return {
                hasInput: this.$refs.autocompleteField.hasInput,
                hasError: this.$refs.autocompleteField.hasError
            }
        }, (val) => {
            if (val.hasInput) {
                this.error = val.hasError
            }
        })
    },
    data () {
        return {
            error: false,
            icon: undefined
        }
    },
    computed: {
        vAutocomplete () {
            return {
                items: this.items,
                itemText: this.itemText,
                itemValue: this.itemValue,
                value: this.value,
                dense: this.dense,
                height: this.height,
                placeholder: this.placeholder,
                prependInnerIcon: this.icon,
                outlined: true,
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                menuProps: {
                    maxHeight: '200px'
                },
                noDataText: 'Data Kosong.',
                autocomplete: 'off',
                hideDetails: 'auto',
                errorMessages: this.errorMessages,
                rules: this.validationRules,
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly
            }
        },
        validationRules () {
            let rules = this.rules ? [...this.rules] : []

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
        },
        blur ($event) {
            this.icon = undefined
            if (this.$refs.autocompleteField) {
                this.error = this.$refs.autocompleteField.hasError
            }
            this.$emit('blur', $event)
        }
    }
}
