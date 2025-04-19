<template>
    <div class="flex flex-col h-full">

        <div class="chat-messages flex-1 overflow-y-auto p-4 space-y-4">
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
const loading = ref(false)

const sendMessage = async () => {
    if (!input.value.trim()) return

    const newMessage = { role: 'user', content: input.value }
    messages.value.push(newMessage)
    const userInput = input.value
    input.value = ''
    loading.value = true

    // Prepare context: all previous messages (optional: skip system messages)
    const context = messages.value
        .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`)
        .join('\n')

    try {
        const res = await $fetch('/api/chat', {
            method: 'POST',
            body: {
                message: userInput,
                context // this is the full history!
            }
        })

        console.log('Response:', res.message);
        messages.value.push({ role: 'assistant', content: res.message })
    } catch (e) {
        messages.value.push({ role: 'assistant', content: '⚠️ Error occurred. Try again.' })
    } finally {
        loading.value = false
    }

}
</script>