import { authApi } from "@/api"
import { defineStore } from "pinia"
import { ref } from "vue"

const useAuthStore = defineStore(
    "auth",
    () => {
        const token = ref(localStorage.getItem("accessToken") || null)
        const user = ref(
            JSON.parse(localStorage.getItem("user")) || null
        )

        const signup = async (credentials) => {
            const response = await authApi.signup(credentials)
            const { accessToken, user: userData } = response.data

            token.value = accessToken
            user.value = userData

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('currentUser', JSON.stringify(userData.email))
            localStorage.setItem('rented', JSON.stringify([]))

            return response
        }



        const login = async (credentials) => {
            const response = await authApi.login(credentials)

            const { accessToken, user: userData } = response.data

            token.value = accessToken
            user.value = userData

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("user", JSON.stringify(userData))

            return response
        }

        const logout = () => {
            token.value = null
            user.value = null

            localStorage.removeItem("accessToken")
            localStorage.removeItem("user")
        }

        return {
            token,
            user,
            signup,
            login,
            logout
        }
    },
    {
        persist: true
    }
)

export default useAuthStore