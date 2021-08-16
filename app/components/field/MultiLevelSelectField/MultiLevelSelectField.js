/**
 * Field untuk memilih opsi-opsi dengan child
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'MultiLevelSelectField',
    props: {
        items: Array,
        itemText: String,
        itemValue: String,
        childName: String,
        childText: String,
        childValue: String,
        value: String | Number,
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
    created () {
        this.init()
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
            checked: this.value,
            display: false,
            displayText: null,
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
                minWidth: 290,
                maxHeight: 350
            }
        },
        vTextField () {
            return {
                value: this.displayText,
                dense: this.dense,
                height: this.height,
                placeholder: this.placeholder,
                outlined: true,
                readonly: true,
                clearable: true,
                appendIcon: 'mdi-menu-down',
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                hideDetails: 'auto',
                errorMessages: this.errorMessages,
                rules: this.validationRules,
                required: this.required,
                disabled: this.disabled,
                autocomplete: 'off'
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
        },
        initItems () {
            if (this.value) {
                return this.items.map((item) => {
                    if (item[this.childName].find(child => child[this.childValue] === this.value)) {
                        return {
                            ...item,
                            active: true
                        }
                    } else {
                        return item
                    }
                })
            } else {
                return this.items
            }
        }
    },
    methods: {
        init () {
            let mergeItem = [ ...this.items ]

            this.items.forEach((item) => {
                mergeItem = [
                    ...mergeItem,
                    ...item[this.childName]
                ]
            })

            if (this.value) {
                const findSelected = mergeItem.find(item => item[this.itemValue] === this.value || item[this.childValue] === this.value)
                this.displayText = findSelected[this.itemText] ? findSelected[this.itemText] : findSelected[this.childText]
            }
        },
        change () {
            this.$emit('input', this.checked)
        },
        clear () {
            this.displayText = null
            this.checked = null
            this.$emit('input', null)
        },
        input ($event) {
            if (!$event) {
                this.displayText = null
                this.checked = null
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
            if (val) {
                this.init()
            }
        }
    }
}
