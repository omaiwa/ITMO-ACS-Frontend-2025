<template>
    <div>
        <h3>History</h3>
        <div v-if="userHistory.length === 0">No history yet.</div>
        <div v-else>
            <div v-for="entry in userHistory" :key="entry.timestamp" class="history-item">
                <template v-if="entry.type === 'rent'">
                    <strong>Rented:</strong> {{ entry.propertyName }}
                    —
                    <small>{{ formatDate(entry.timestamp) }}</small>
                </template>
                <template v-else-if="entry.type === 'message'">
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import { computed } from 'vue'

const props = defineProps({
    history: { type: Array, default: () => [] }
})

const authStore = useAuthStore()

const userHistory = computed(() => {
    return props.history.filter(h => h.user === authStore.user?.email)
})

function formatDate(date) {
    return new Date(date).toLocaleString()
}
</script>