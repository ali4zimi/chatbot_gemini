<template>
    <div class="flex flex-col h-screen">
        <Navbar />

        <div class="flex flex-1 overflow-hidden">
            <Sidebar class="w-64 bg-gray-100 border-r overflow-y-auto" />
            <main class="flex-1 bg-white overflow-y-auto">
                <Chat />
            </main>
        </div>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Sidebar from '~/components/Sidebar.vue'
import Chat from '~/components/Chat.vue'
</script>