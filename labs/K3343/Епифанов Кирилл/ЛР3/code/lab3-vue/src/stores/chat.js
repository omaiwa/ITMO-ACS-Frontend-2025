import { defineStore } from 'pinia'
import { chatApi } from '@/api'

const useChatStore = defineStore('chat', {
    state: () => ({
        messages: [],
        activePropertyId: null
    }),

    actions: {
        async loadMessages(propertyId) {
            this.activePropertyId = propertyId

            const response = await chatApi.getMessages(propertyId)
            this.messages = response.data

            return response
        },

        async sendMessage(property, messageText) {
            const response = await chatApi.sendMessage(property, messageText)
            this.messages.push(response.data)

            return response
        },

        clearChat() {
            this.messages = []
            this.activePropertyId = null
        }
    }
})

export default useChatStore