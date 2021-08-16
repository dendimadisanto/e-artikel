import { mapState, mapActions } from 'vuex'

/**
 * Field untuk memilih status keberangkatan paket
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'StatusKeberangkatanField',
    props: ['value'],
    async created () {
        await this.load()
    },
    computed: {
        ...mapState({
            items: state => state.Master.StatusKeberangkatan.data
        })
    },
    methods: {
        ...mapActions('Master/StatusKeberangkatan', ['load'])
    }
}
