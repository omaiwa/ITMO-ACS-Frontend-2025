<template>
    <form @submit.prevent="handleRegister">
        <div class="mb-3">
            <label for="email" class="form-label">Email address
                <input autocomplete="off" type="email" v-model="form.email" class="form-control" id="email" required>
            </label>
            <div class="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Password
                <input autocomplete="off" type="password" v-model="form.password" class="form-control" id="password"
                    required>
            </label>
        </div>

        <div class="mb-3">
            <label for="firstName" class="form-label">Name
                <input type="text" v-model="form.firstName" class="form-control" id="firstName" required>
            </label>
        </div>

        <div class="mb-3">
            <label for="lastName" class="form-label">Surname
                <input type="text" v-model="form.lastName" class="form-control" id="lastName" required>
            </label>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
})

const handleRegister = async () => {
    try {
        await authStore.signup(form)
        alert('Registration successful!')
        router.push('/')
    } catch (err) {
        console.error(err)
        alert('Registration failed!')
    }
}
</script>