<template>
    <div class="flex flex-col h-full">

        <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div v-for="(message, index) in messages" :key="index"
                :class="message.role === 'user' ? 'text-right' : 'text-left'">
                <div class="inline-block px-4 py-2 rounded-lg max-w-xs"
                    :class="message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'">
                    {{ message.content }}
                </div>
            </div>
        </div>

        <!-- Input area -->
        <form @submit.prevent="sendMessage" class="p-4 border-t border-gray-300 flex gap-2">
            <input v-model="input" type="text" placeholder="Type your message..."
                class="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                Send
            </button>
        </form>
    </div>
</template>

<script setup>
const input = ref('')
const messages = ref([
    { role: 'ai', content: 'Hello! Upload a file and ask me anything about it.' },
])

const sendMessage = () => {
    if (!input.value.trim()) return
    messages.value.push({ role: 'user', content: input.value })
    input.value = ''
    // Simulate AI reply
    setTimeout(() => {
        messages.value.push({ role: 'ai', content: 'Let me process that for you...' })
    }, 500)
}
</script>