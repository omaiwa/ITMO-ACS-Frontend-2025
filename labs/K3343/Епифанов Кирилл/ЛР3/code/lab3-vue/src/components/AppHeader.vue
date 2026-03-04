<template>
  <header class="header">
    <router-link to="/" class="logo">Rentussy</router-link>

    <div class="navbar">
      <svg class="icon" role="button" tabindex="0" @click="toggleTheme" @keydown.enter.prevent="toggleTheme"
        @keydown.space.prevent="toggleTheme">
        <use :xlink:href="iconHref"></use>
      </svg>

      <template v-if="authStore.user">
        <router-link to="/profile" class="profile-icon">
          Profile
        </router-link>
      </template>

      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>
    </div>
  </header>
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import { computed, onMounted, ref, watch } from 'vue'

const authStore = useAuthStore()
const darkTheme = ref(localStorage.getItem("darkTheme") === "true")

onMounted(() => {
  if (darkTheme.value) {
    document.body.classList.add("dark-theme")
  }
})

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value
  document.body.classList.toggle("dark-theme")
  localStorage.setItem("darkTheme", darkTheme.value)
}

const iconHref = computed(() =>
  darkTheme.value
    ? "/sprite.svg#sun"
    : "/sprite.svg#moon"
)

watch(
  () => authStore.user,
  (newVal) => {
    console.log("User state changed:", newVal)
  }
)
</script>