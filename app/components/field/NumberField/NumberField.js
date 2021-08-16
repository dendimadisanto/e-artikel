/**
 * Field text untuk input dengan format angka
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'NumberField',
    props: {
        value: String | Number,
        type: {
            type: String,
            default: 'integer'
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
        prepend: String,
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
    mounted () {
        if ((!!this.value || this.value === 0)) {
            this.input(this.value.toString().replace('.', ','))
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
                backgroundColor: this.backgroundColor,
                color: this.color,
                errorMessages: this.errorMessages,
                rules: this.rules,
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly,
                appendOuter: this.appendOuter,
                prepend: this.prepend
            }
        }
    },
    methods: {
        input ($event) {
            if ($event) {
                const splitNumber = $event.replace(/[^.,0-9]/, '').split(',')
                const realValue = splitNumber[0].toString().split('.')
                const reverseValue = realValue.join('').replace(/[^0-9]/, '').split('').reverse()
                const fractionValue = splitNumber[1] ? splitNumber[1].toString() : 0

                let resultValue = ''
                reverseValue.forEach((item, index) => {
                    const position = index + 1
                    if (position % 3 === 0 && position !== reverseValue.length) {
                        resultValue += (item + '.')
                    } else {
                        resultValue += item
                    }
                })
                resultValue = resultValue.split('').reverse().join('')

                this.display = fractionValue !== 0 ? resultValue + ',' + fractionValue : resultValue

                const returnValue = fractionValue !== 0 ? parseInt(realValue.join('')) + (parseInt(fractionValue) / (10 ** fractionValue.length)) : parseInt(realValue.join(''))

                this.$emit('input', returnValue)
            } else {
                this.display = null
                this.$emit('input', null)
            }
        },
        keydown ($event) {
            if ($event.key && !$event.key.includes('Arrow') && !$event.key.match(/[0-9]/g)) {
                if (this.type === 'integer' && !['Backspace', 'Delete'].includes($event.key)) {
                    $event.preventDefault()
                } else if (this.type === 'float' && !['Backspace', 'Delete', ','].includes($event.key)) {
                    $event.preventDefault()
                }
            }

            this.$emit('keydown', $event)
        },
        click ($event) {
            if (this.$refs.textField) {
                this.error = this.$refs.textField.hasError
            }
            this.$emit('click', $event)
        }
    },
    watch: {
        value (val, old) {
            if ((!!val || val === 0) && val !== old) {
                this.input(val.toString().replace('.', ','))
            }
            if (val === null) {
                this.input(null)
            }
        }
    }
}
