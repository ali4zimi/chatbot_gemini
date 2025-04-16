<template>
    <aside class="w-64 bg-white border-r shadow-sm p-4 rounded-tr-xl rounded-br-xl">
        <h2 class="text-lg font-medium text-gray-700">Upload Files</h2>

        <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-500 cursor-pointer hover:border-blue-500">
            <input type="file" class="hidden" ref="fileInput" @change="handleFileUpload" />
            <div @click="triggerFileInput">
                Click to upload or drag & drop
            </div>
        </div>

        <div>
            <h3 class="text-sm font-semibold text-gray-600 mb-2">Files</h3>
            <ul class="text-sm text-gray-700 space-y-1">
                <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
const fileInput = ref(null)

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileUpload = (event) => {
    const uploaded = Array.from(event.target.files)
    files.value.push(...uploaded)
}
</script>