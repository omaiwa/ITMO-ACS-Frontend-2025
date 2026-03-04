import useAuthStore from '@/stores/auth'

export default function useAuth() {
    const authStore = useAuthStore()
    return authStore
}