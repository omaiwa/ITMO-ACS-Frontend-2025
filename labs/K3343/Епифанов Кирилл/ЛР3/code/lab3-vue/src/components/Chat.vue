<template>
    <div class="chat-overlay">
        <div class="chat-window">
            <div class="chat-header">
                <span>Chat - {{ property.name }}</span>
                <button @click="$emit('close')">X</button>
            </div>

            <div class="chat-messages">
                <div v-for="msg in chatStore.messages" :key="msg.timestamp" class="chat-message">
                    <div>{{ msg.message }}</div>
                    <small>{{ formatDate(msg.timestamp) }}</small>
                </div>

                <p v-if="chatStore.messages.length === 0">
                    No messages yet.
                </p>
            </div>

            <div class="chat-input">
                <input id="chatInput" v-model="newMessage" placeholder="Write a message..."
                    @keyup.enter="sendMessage" />
                <button @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import useChatStore from '@/stores/chat'
import { ref, watch } from 'vue'

const chatStore = useChatStore()
const newMessage = ref('')

const props = defineProps({
    property: Object
})

watch(
    () => props.property.id,
    (id) => {
        if (id) {
            chatStore.loadMessages(id)
        }
    },
    { immediate: true }
)

const sendMessage = async () => {
    if (!newMessage.value.trim()) return

    await chatStore.sendMessage(props.property, newMessage.value)
    newMessage.value = ''
}

function formatDate(date) {
    return new Date(date).toLocaleString()
}
</script>
