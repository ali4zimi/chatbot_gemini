<template>
    <div class="space-y-2">
        <h2 class="text-base font-semibold text-gray-700 mb-2">Recent Chats</h2>
        <ul class="space-y-1">
            <li v-for="chat in chats" :key="chat.id"
                class="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer text-sm text-gray-800"
                @click="$emit('select-chat', chat)">
                💬 {{ chat.title || 'Untitled Chat' }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const chats = [
    { id: 1, title: 'Project Brief.pdf' },
    { id: 2, title: 'Meeting Notes' },
    { id: 3, title: 'Budget Estimation' },
    // You can make this dynamic later with a store or API call
]
</script>