const Cookie = process.client ? require('js-cookie') : undefined
import cookieparser from 'cookieparser'
export default {
    setLoading ({
        commit
    }, payload) {
        commit('SET_LOADING', payload)
    },
    setLang ({
        commit
    }, payload) {
        commit('SET_LANG', payload)
    },
    showMessage ({
        commit
    }, payload) {
        commit('SHOW_MESSAGE', payload)
    },
    setAuth ({
        commit
    }, payload) {
        commit('SET_AUTH', payload)
    },
    fetchCookie ({ dispatch }) {
        let auth
        if (process.client) {
            if (document.cookie) {
                const parsed = cookieparser.parse(document.cookie)
                console.log(parsed.authImsArtikel)
                try {
                    auth = JSON.parse(parsed.authImsArtikel)
                } catch (err) {
                    auth = null
                }
            }

            dispatch('setAuth', auth || null)
        }
    },
    middleware_client_auth ({ dispatch, state }) {
        const base = this.$router.history.base ? this.$router.history.base : ''
        if (process.client) {
            if (!state.auth) {
                window.location.replace(base + '/login')
                return false
            }
        }
    },
    middleware_client_not_auth ({ dispatch, state }) {
        const base = this.$router.history.base ? this.$router.history.base : ''
        if (process.client) {
            if (state.auth) {
                window.location.replace(base + '/artikel')
                return false
            }
        }
    },
    async logout ({ dispatch }) {
        // await this.$axios.$post('publik/logout')
        dispatch('setAuth', null)
        Cookie.remove('authImsArtikel')
        this.$router.push('/login');
        dispatch('setAuth', null)
        return false;
    },
    async DoLogin({
        dispatch
    }, payload){
        try{
            const { data } = await this.$axios.$post('login', payload);
            const dataLogin = {
                id : data.id,
                username : data.username,
                token : data.token
            }
            Cookie.set('authImsArtikel', JSON.stringify(dataLogin), { expires: 1 / 4 }) // 6 jam cookie
            this.$axios.setHeader('TOKEN', data.token);
            dispatch('setAuth', dataLogin)
           
            return {
                    status: true,
                    message: 'Berhasil Login'
            }
        }
        catch(e){
            dispatch('setAuth', null)
            Cookie.remove('authImsArtikel')

            if (e.message.toLowerCase().includes('network')) {
                return {
                    status: false,
                    message: 'Koneksi bermasalah, silakan cek koneksi internet.'
                }
            } else {
                const {
                    errors,
                    message
                } = e.response.data

                return {
                    status: false,
                    errors,
                    message
                }
            }
        }
        
    },
    
}