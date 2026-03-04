<template>
    <div class="container mt-5">
        <LoginForm />
    </div>
</template>

<script setup>
import LoginForm from "@/components/LoginForm.vue"
import useAuthStore from "@/stores/auth"
import { onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
    if (authStore.token) {
        router.push("/")
    }
})
</script>