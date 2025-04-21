<template>
    <div class="flex flex-col h-full">

        <div class="chat-messages flex-1 overflow-y-auto p-4 space-y-4">
            <div class="text-left">
                <div class="inline-block px-4 py-2 rounded-lg max-w-xs bg-gray-100 text-gray-800">
                    Hello! Upload a file and ask me anything about it.
                </div>
            </div>
            <div v-for="(message, index) in chatHistory" :key="index"
                :class="message.role === 'user' ? 'text-right' : 'text-left'">
                <div class="inline-block px-4 py-2 rounded-lg max-w-xs"
                    :class="message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'">
                    {{ message.parts[0].text }}
                </div>
            </div>
        </div>

        <!-- Input area -->
        <form @submit.prevent="sendMessage" class="p-4 border-t border-gray-300 flex gap-2">
            <input v-model="input" type="text" placeholder="Type your message..."
                class="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="button" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300"
                @click="scrollToBottom">
                Scroll to bottom
            </button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                Send
            </button>
        </form>
    </div>
</template>

<script setup>
import { GoogleGenAI } from "@google/genai";

const input = ref('')
const chatHistory = ref([])
const loading = ref(false)

const sendMessage = async () => {
    if (!input.value.trim()) return

    const newMessage = { role: 'user', parts: [{ text: input.value }] }
    chatHistory.value.push(newMessage)
    const userInput = input.value
    input.value = ''
    loading.value = true

    const response = await fetch("/api/chat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            context: chatHistory.value,
            userInput: userInput,
        }),
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let done = false

    while (!done) {
        const { done: streamDone, value } = await reader.read()
        done = streamDone
        if (value) {
            const chunk = decoder.decode(value, { stream: true })
            console.log(chunk)
            appendChunk(chunk)
            scrollToBottom()
        }
    }


    const stream = fetchStream();

    function appendChunk(chunk) {
        if (chatHistory.value[chatHistory.value.length - 1].role === 'model') {
            chatHistory.value[chatHistory.value.length - 1].parts[0].text += chunk
        } else {
            chatHistory.value.push({ role: 'model', parts: [{ text: chunk }] })
        }

    }

}



const scrollToBottom = () => {
    const chatMessages = document.querySelector('.chat-messages')
    chatMessages.scrollTop = chatMessages.scrollHeight
}
</script>