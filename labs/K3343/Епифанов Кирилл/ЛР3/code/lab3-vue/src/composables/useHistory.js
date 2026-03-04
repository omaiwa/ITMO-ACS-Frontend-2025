import { ref } from 'vue'

export function useHistory() {
    const history = ref(JSON.parse(localStorage.getItem('history')) || [])

    const saveHistory = () => localStorage.setItem('history', JSON.stringify(history.value))

    const addRent = (property, userEmail) => {
        history.value.push({
            type: "rent",
            propertyId: property.id,
            propertyName: property.name,
            timestamp: new Date().toISOString(),
            user: userEmail
        })

        saveHistory()
    }

    const addMessage = (property, userMessage, userEmail) => {
        history.value.push({
            type: 'message',
            propertyId: property.id,
            propertyName: property.name,
            timestamp: new Date().toISOString(),
            user: userEmail,
            message: userMessage
        })
        saveHistory()
    }

    return { history, addRent, addMessage }
}