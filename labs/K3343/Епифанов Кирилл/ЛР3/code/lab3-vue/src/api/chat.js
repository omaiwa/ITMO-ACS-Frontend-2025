import useAuthStore from '@/stores/auth'

class ChatApi {
    constructor(instance) {
        this.API = instance
    }

    getCurrentUser() {
        const authStore = useAuthStore()
        return authStore.user?.email || null;
    }

    getHistory() {
        return JSON.parse(localStorage.getItem("history")) || []
    }

    saveHistory(history) {
        localStorage.setItem("history", JSON.stringify(history))
    }

    getMessages = async (propertyId) => {
        const history = this.getHistory()

        const messages = history.filter(h =>
            h.type === "message" &&
            h.propertyId === propertyId &&
            h.user === this.getCurrentUser()
        )

        return Promise.resolve({ data: messages })
    }

    sendMessage = async (property, messageText) => {
        const history = this.getHistory()

        const newMessage = {
            type: "message",
            propertyId: property.id,
            timestamp: new Date().toISOString(),
            user: this.getCurrentUser(),
            message: messageText
        }

        history.push(newMessage)
        this.saveHistory(history)

        return Promise.resolve({ data: newMessage })
    }
}

export default ChatApi