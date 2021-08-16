/**
 * Field dropdown mirip dengan autocomplete sehingga bisa di searching dengan mengetikkan beberapa huruf
 * Field ini digunakan jika ingin menambahkan pilihan custom yang tidak ada pada daftar pilihan yang tersedia
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'ComboboxField',
    props: {
        items: Array,
        itemText: String,
        itemValue: String,
        textStyle: String,
        value: String | Object,
        placeholder: String,
        tile: Boolean,
        multiple: Boolean,
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
        loading: {
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
                hasInput: this.$refs.comboboxField.hasInput,
                hasError: this.$refs.comboboxField.hasError
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
            model: null,
            search: null,
            icon: undefined
        }
    },
    computed: {
        vCombobox () {
            return {
                items: this.items,
                itemText: this.itemText,
                itemValue: this.itemValue,
                value: this.value ? this.value : this.model,
                hideNoData: !this.search,
                dense: this.dense,
                height: this.height,
                placeholder: this.placeholder,
                prependInnerIcon: this.icon,
                outlined: true,
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                chips: true,
                deletableChips: true,
                smallChips: true,
                autocomplete: 'off',
                menuProps: {
                    closeOnContentClick: true,
                    maxHeight: '200px'
                },
                hideDetails: 'auto',
                errorMessages: this.errorMessages,
                rules: this.validationRules,
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly,
                loading: this.loading
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
            if (typeof $event === 'string') {
                this.model = {}
                this.model[this.itemText] = $event
            } else {
                this.model = $event
            }
            this.$emit('input', this.model)
        },
        updateSearch ($event) {
            if ($event && this.textStyle === 'uppercase') {
                this.search = $event.toUpperCase()
            } else if ($event && this.textStyle === 'lowercase') {
                this.search = $event.toLowerCase()
            } else {
                this.search = $event
            }
        },
        blur ($event) {
            this.icon = undefined
            if (this.$refs.comboboxField) {
                this.error = this.$refs.comboboxField.hasError
            }
            this.$emit('blur', $event)
        }
    }
}
