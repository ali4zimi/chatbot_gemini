<template>
    <aside class="p-4 border-b md:border-b-0 md:border-r transition-all duration-200" :class="{
        'bg-blue-50 border-blue-400': isDragging,
        'bg-white border-gray-200': !isDragging
    }" @dragenter.prevent="isDragging = true" @dragover.prevent @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop">
        <div>
            <h2 class="text-base font-semibold text-gray-700">Upload Files</h2>
            <p class="text-sm text-gray-500">
                Drag & drop or <span @click="triggerFileInput" class="underline cursor-pointer">click to upload</span>
            </p>
        </div>

        <input ref="fileInput" type="file" multiple class="hidden" @change="handleFileChange" />

        <ul class="space-y-1 text-sm text-gray-800 mt-4 max-h-32 overflow-y-auto md:max-h-full">
            <li v-for="(file, index) in files" :key="index" class="flex items-center gap-2">
                📄 {{ file.name }}
            </li>
        </ul>
    </aside>
</template>


<script setup>
import { ref } from 'vue'

const isDragging = ref(false)
const files = ref([])
const fileInput = ref(null)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    files.value.push(...newFiles)
}

const handleDrop = (e) => {
    isDragging.value = false
    const droppedFiles = Array.from(e.dataTransfer.files)
    files.value.push(...droppedFiles)
}
</script>