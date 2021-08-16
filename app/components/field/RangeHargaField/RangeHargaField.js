/**
 * Field memilih range harga paket
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
    name: 'RangeHargaField',
    props: ['value'],
    data () {
        return {
            items: [
                {
                    value: 0,
                    text: 'Semua Range Harga'
                },
                {
                    value: 1,
                    text: '< IDR 20.000.000'
                },
                {
                    value: 2,
                    text: 'IDR 20.000.000 s/d IDR 25.000.000'
                },
                {
                    value: 3,
                    text: 'IDR 25.000.000 s/d IDR 30.000.000'
                },
                {
                    value: 4,
                    text: '> IDR 30.000.000'
                }
            ]
        }
    }
}
