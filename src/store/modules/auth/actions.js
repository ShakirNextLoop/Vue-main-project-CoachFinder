export default {
    async login(context, payload) {
        context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload) {
        const mode = payload.mode
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByePwYIqLr5QwfxgOlhoOb0fG9rmaXTto'
        if (mode == 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByePwYIqLr5QwfxgOlhoOb0fG9rmaXTto'
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            const err = new Error("Something went wrong")
            throw err
        }
        const responseData = await response.json()

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)



        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })

    },
    tryLogin(context) {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')


        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExpiration: null
            })
        }
    },
    logout(context) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')


        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        })
    }

}