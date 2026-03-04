class AuthApi {
    constructor(instance) {
        this.API = instance
    }

    signup = async (data) => {
        return this.API({
            method: 'POST',
            url: '/signup',
            data,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    login = async (data) => {
        return this.API({
            method: "POST",
            url: "/login",
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export default AuthApi