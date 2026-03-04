<template>
    <div class="container">
        <h2>{{ auth.user?.email || 'Guest' }}</h2>
        <button @click="logout">Logout</button>

        <HistoryContainer :history="history" />

        <section>
            <h3>Rented Properties</h3>
            <div class="grid">
                <PropertyCard v-for="property in rentedProperties" :key="property.id" :property="property" />
            </div>
        </section>

        <section>
            <h3>Available Properties</h3>
            <div class="grid">
                <PropertyCard v-for="property in availableProperties" :key="property.id" :property="property" />
            </div>
        </section>

    </div>
</template>

<script setup>
import HistoryContainer from '@/components/HistoryContainer.vue'
import PropertyCard from '@/components/PropertyCard.vue'
import useAuth from '@/composables/useAuth'
import { useHistory } from '@/composables/useHistory'
import usePropertiesStore from '@/stores/properties'
import { computed, onMounted } from 'vue'

const auth = useAuth()
const propertiesStore = usePropertiesStore()
const { history, addRent, addMessage } = useHistory()

const logout = () => {
    auth.logout()
    window.location.href = '/'
}

onMounted(async () => {
    await propertiesStore.loadProperties()
})

const rentedProperties = computed(() => propertiesStore.getRentedProperties())
const availableProperties = computed(() => propertiesStore.getAvailableProperties())
</script>