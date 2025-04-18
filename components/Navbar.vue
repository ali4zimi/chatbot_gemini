<!-- Navbar.vue -->
<template>
  <div class="flex justify-between items-center px-4 h-16 bg-white shadow">
    <div class="text-lg font-bold">My RAG App</div>
    <div class="flex gap-2 lg:hidden">
      <button @click="$emit('toggle-left')" class="p-2 rounded hover:bg-gray-200">📄</button>
      <button @click="$emit('toggle-right')" class="p-2 rounded hover:bg-gray-200">📁</button>
    </div>
  </div>
</template>
