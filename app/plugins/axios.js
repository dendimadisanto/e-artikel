import https from 'https';
export default function ({
    $axios,
    store,
    redirect
}) {
    const auth = store.state.auth

    if (auth !== null) {
        $axios.setHeader('TTOKEN', auth.t_token)
        $axios.setToken(auth.jwt_token, 'Bearer')
    }

     const agent = new https.Agent({
        rejectUnauthorized: false
      });

    $axios.onRequest((config) => {
        if (process.env.NODE_ENV === 'production') {
          config.httpsAgent = agent;
        }
        // config.https = (process.env.NODE_ENV === 'production')
        config.baseURL = process.env.BASE_URL
        const {
            url,
            baseURL,
            method
        } = config
        // store.commit('LOADING_START', makeLoadingName(url, baseURL, method))
    })

    $axios.onResponse((response) => {
        const {
            url,
            baseURL,
            method
        } = response.config
        // store.commit('LOADING_STOP', makeLoadingName(url, baseURL, method))
    })

    $axios.onError((error) => {
        if (!error.response) {
            error.response = {
                data: {
                    code: 500,
                    message: 'Server dalam perbaikan.',
                    data: null,
                    errors: null
                }
            }
            return Promise.reject(error)
        }

        if (error.message.toLowerCase().includes('network')) {
            store.commit('LOADING_STOP_ALL')
        } else {
            const code = parseInt(error.response && error.response.status)
            const {
                url,
                baseURL,
                method
            } = error.response.config
            // store.commit('LOADING_STOP', makeLoadingName(url, baseURL, method))

            switch (code) {
            case 401:
                store.dispatch('logout')
                break
            }

            return Promise.reject(error)
        }
        console.clear()
    })
}

function makeLoadingName (url, baseUrl, method) {
    let cleanUrl = url.replace(baseUrl, '').replace(/-/g, '_')
    cleanUrl = cleanUrl.split('?')[0]
    return method + '_' + cleanUrl.split('/').splice(0, 2).join('_')
}
