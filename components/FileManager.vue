<template>
    <div>
        <h2 class="text-lg font-medium text-gray-700">Upload Files</h2>

        <FileDropZone @files="handleFiles" />

        <div>
            <h3 class="text-sm font-semibold text-gray-600 mb-2">Files</h3>
            <ul class="text-sm text-gray-700 space-y-1">
                <li v-for="(file, index) in files" :key="index">
                    📄 {{ file.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const files = ref([])

const handleFiles = (newFiles) => {
    files.value.push(...newFiles)
}
</script>