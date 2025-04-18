<template>
    <div
      class="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200"
      :class="{
        'border-blue-500 bg-blue-50 text-blue-600': isDragging,
        'border-gray-300 text-gray-500 bg-white': !isDragging
      }"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        multiple
        @change="handleFileChange"
      />
      <p class="text-sm">
        <span class="font-medium">Drag and drop</span> files here, or <span class="underline">click to upload</span>
      </p>
  
      <ul class="mt-4 text-left text-sm text-gray-700 space-y-1">
        <li v-for="(file, index) in files" :key="index" class="truncate">
          📄 {{ file.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, toRefs } from 'vue'
  const props = defineProps({
    files: Array
  })
  const emit = defineEmits(['files'])
  const { files } = toRefs(props)
  
  const isDragging = ref(false)
  const fileInput = ref(null)
  
  const triggerFileInput = () => fileInput.value?.click()
  
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    emit('files', newFiles)
  }
  
  const handleDrop = (e) => {
    isDragging.value = false
    const droppedFiles = Array.from(e.dataTransfer.files)
    emit('files', droppedFiles)
  }
  </script>
  