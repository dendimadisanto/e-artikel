/**
 * Field untuk memasukkan keyword pencarian
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'SearchField',
    props: {
        value: String,
        md: {
            type: String | Number,
            default: 3
        }
    },
    methods: {
        input ($event) {
            this.$emit('input', $event)
        }
    }
}
