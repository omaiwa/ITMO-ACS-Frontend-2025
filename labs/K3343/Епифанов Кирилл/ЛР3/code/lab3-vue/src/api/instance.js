import useAuthStore from '@/stores/auth'
import axios from 'axios'

const apiURL = 'http://localhost:3000'

const instance = axios.create({
    baseURL: apiURL
})

instance.interceptors.request.use((config) => {
    const authStore = useAuthStore()

    if (config.url !== '/signup' && authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
    }

    return config
})

export default instance