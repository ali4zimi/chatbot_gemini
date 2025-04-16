<template>
    <div class="h-full flex flex-col p-4">
        <div class="flex-1 space-y-2 overflow-y-auto mb-4">
            <div v-for="(msg, i) in messages" :key="i" :class="msg.sender === 'user' ? 'text-right' : 'text-left'">
                <div :class="msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'"
                    class="inline-block p-2 rounded-lg max-w-lg">
                    {{ msg.text }}
                </div>
            </div>
        </div>

        <form @submit.prevent="sendMessage" class="flex gap-2">
            <input v-model="input" type="text" placeholder="Type your message..."
                class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400" />
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Send</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([
    { sender: 'ai', text: 'Hello! Upload a file and ask me anything about it.' }
])
const input = ref('')

const sendMessage = () => {
    if (!input.value.trim()) return

    messages.value.push({ sender: 'user', text: input.value })
    // Fake AI response
    setTimeout(() => {
        messages.value.push({ sender: 'ai', text: `You said: ${input.value}` })
    }, 500)

    input.value = ''
}
</script>