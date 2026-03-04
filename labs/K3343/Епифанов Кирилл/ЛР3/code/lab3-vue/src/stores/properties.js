import { propertiesApi } from '@/api'
import { defineStore } from 'pinia'

const usePropertiesStore = defineStore('properties', {
    state: () => ({
        properties: [],
        loaded: false
    }),

    actions: {
        async loadProperties() {

            if (this.loaded) return

            const response = await propertiesApi.getAll()

            this.properties = response.data
            this.loaded = true

            return response
        },

        getRentedProperties() {
            const rented = JSON.parse(localStorage.getItem('rented')) || []
            return this.properties.filter(p => rented.some(r => r.id === p.id))
        },

        getAvailableProperties() {
            const rented = JSON.parse(localStorage.getItem('rented')) || []
            return this.properties.filter(p => !rented.some(r => r.id === p.id))
        }

        //fix this later ???
    },

    persist: true
})

export default usePropertiesStore