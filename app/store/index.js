const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
    nuxtServerInit ({
        dispatch
    }, {
        req
    }) {
        let auth = null
                if (req && req.headers.cookie) {
                    const parsed = cookieparser.parse(req.headers.cookie)
                    try {
                        auth = JSON.parse(parsed.eArtikel)
                    } catch (err) {
                        auth = null
                    }
                }
                dispatch('setAuth', auth)
    }
}
