import { mapState, mapActions, mapGetters } from 'vuex'

/**
 * Field untuk input alamat secara lengkap
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'AlamatField',
    props: {
        value: {
            type: Object,
            default: () => ({
                alamat: null,
                negara: null,
                provinsi: null,
                kota: null
            })
        },
        height: String | Number,
        dense: {
            type: Boolean,
            default: true
        },
        label: String,
        placeholder: String,
        negaraDefault: {
            type: String | Number,
            default: 85
        },
        errorMessagesAlamat: Array,
        errorMessagesKota: Array,
        errorMessagesProvinsi: Array,
        errorMessagesNegara: Array,
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
        alamatField: {
            type: Boolean,
            default: true
        },
        negaraField: {
            type: Boolean,
            default: true
        },
        onlyAlamatField: {
            type: Boolean,
            default: false
        },
        md: {
            type: String | Number,
            default: 9
        }
    },
    async created () {
        await this.loadNegara()
        if (!this.value || !this.value.negara) {
            this.$emit('input', { ...this.value, negara: parseInt(this.negaraDefault) })
        }
        if (this.value && this.value.negara) {
            await this.loadProvinsi(this.value.negara)
        }
        if (this.value && this.value.provinsi) {
            await this.loadKabupaten(this.value.provinsi)
        }
    },
    mounted () {
        this.$watch(() => {
            return {
                hasInput: this.$refs.alamatField.hasInput || this.$refs.selectNegara.hasInput || this.$refs.selectProvinsi.hasInput || this.$refs.selectKota.hasInput,
                hasError: this.$refs.alamatField.hasError || this.$refs.selectNegara.hasError || this.$refs.selectProvinsi.hasError || this.$refs.selectKota.hasError
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
        ...mapState({
            dataNegara: state => state.Master.Negara.data
        }),
        ...mapGetters('Master/Provinsi', ['getByNegara']),
        ...mapGetters('Master/Kabupaten', ['getByProvinsi']),
        alamat () {
            return this.value && this.value.alamat ? this.value.alamat : null
        },
        negara () {
            return this.value && this.value.negara ? this.value.negara : null
        },
        provinsi () {
            return this.value && this.value.provinsi ? this.value.provinsi : null
        },
        kota () {
            return this.value && this.value.kota ? this.value.kota : null
        },
        vTextarea () {
            return {
                value: this.alamat,
                dense: this.dense,
                outlined: true,
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                placeholder: this.placeholder,
                hideDetails: 'auto',
                errorMessages: this.errorMessagesAlamat,
                rules: this.validationRules('Alamat'),
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly
            }
        },
        vSelectNegara () {
            return {
                value: this.negara,
                dense: this.dense,
                outlined: true,
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                placeholder: 'Negara',
                items: this.dataNegara,
                itemValue: 'master_negara_id',
                itemText: 'nama',
                hideDetails: 'auto',
                errorMessages: this.errorMessagesNegara,
                rules: this.validationRules('Negara'),
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly,
                menuProps: {
                    maxHeight: '200px'
                }
            }
        },
        vSelectProvinsi () {
            return {
                value: this.provinsi,
                dense: this.dense,
                outlined: true,
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                placeholder: 'Provinsi',
                items: this.negara ? this.getByNegara(this.negara) : [],
                itemValue: 'master_provinsi_id',
                itemText: 'nama',
                hideDetails: 'auto',
                errorMessages: this.errorMessagesProvinsi,
                rules: this.validationRules('Provinsi'),
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly,
                menuProps: {
                    maxHeight: '200px'
                }
            }
        },
        vSelectKota () {
            return {
                value: this.kota,
                dense: this.dense,
                outlined: true,
                backgroundColor: this.disabled ? 'grey lighten-3' : 'white',
                placeholder: 'Kota',
                items: this.provinsi ? this.getByProvinsi(this.provinsi) : [],
                itemValue: 'master_kabupaten_id',
                itemText: 'nama',
                hideDetails: 'auto',
                errorMessages: this.errorMessagesKota,
                rules: this.validationRules('Kota'),
                required: this.required,
                disabled: this.disabled,
                readonly: this.readonly,
                menuProps: {
                    maxHeight: '200px'
                }
            }
        }
    },
    methods: {
        ...mapActions('Master/Negara', {
            loadNegara: 'load'
        }),
        ...mapActions('Master/Provinsi', {
            loadProvinsi: 'load'
        }),
        ...mapActions('Master/Kabupaten', {
            loadKabupaten: 'load'
        }),
        input ($event, type) {
            let newValue = null

            if (this.value !== null) {
                newValue = { ...this.value }
            } else {
                newValue = {
                    alamat: null,
                    negara: null,
                    provinsi: null,
                    kota: null
                }
            }

            newValue[type] = $event

            this.$emit('input', { ...newValue })
        },
        validationRules (field) {
            let rules = this.rules ? [ ...this.rules ] : []

            if (this.required) {
                rules = [
                    ...rules,
                    v => !!v || field + ' harus diisi.'
                ]
            }

            return rules
        },
        blur () {
            this.error = (this.$refs.alamatField && this.$refs.alamatField.hasError) ||
                (this.$refs.selectNegara && this.$refs.selectNegara.hasError) ||
                (this.$refs.selectProvinsi && this.$refs.selectProvinsi.hasError) ||
                (this.$refs.selectKota && this.$refs.selectKota.hasError)
        }
    },
    watch: {
        async value (val, old) {
            if (val.negara) {
                await this.loadProvinsi(val.negara)
            }
            if (val.provinsi) {
                await this.loadKabupaten(val.provinsi)
            }

            if (old && val.negara !== old.negara && val.provinsi === old.provinsi) {
                this.$emit('input', { ...this.value, provinsi: null, kota: null })
            }
            if (old && val.provinsi !== old.provinsi && val.kota === old.kota) {
                this.$emit('input', { ...this.value, kota: null })
            }
        }
    }
}
