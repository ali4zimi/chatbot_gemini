<template>
    <div class="bg-slate-100 h-screen flex flex-col items-center">
        <div class="navbar w-full h-[65px] ">
            <Navbar @toggle-left="toggleLeftSidebar" @toggle-right="toggleRightSidebar" />
        </div>

        <div class="w-full flex flex-1 relative overflow-hidden">
            <div class="left-sidebar"
                :class="{ 'translate-x-0': showLeftSidebar, '-translate-x-full': !showLeftSidebar }">
                <div class="h-full bg-gray-200 z-10 lg:rounded-2xl p-4">
                    <ChatList />
                </div>
            </div>

            <div class="chat-content w-full h-[calc(100vh-4rem)] lg:p-4  overflow-hidden relative ">
                <div class="h-full bg-gray-200 z-10 lg:rounded-2xl">
                    <Chat />
                </div>
            </div>

            <div class="right-sidebar"
                :class="{ 'translate-x-0': showRightSidebar, 'translate-x-full': !showRightSidebar }">
                <div class="h-full bg-gray-200 z-10 lg:rounded-2xl p-4">
                    <FileManager />
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
@reference "tailwindcss";

.left-sidebar {
    @apply py-4 pl-4 overflow-y-auto fixed z-50 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out w-[70%] lg:w-3/12 lg:relative lg:translate-x-0
}

.right-sidebar {
    @apply py-4 pr-4 overflow-y-auto fixed z-50 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out w-[70%] right-0 lg:w-4/12 lg:relative lg:translate-x-0
}
</style>

<script setup>

const showLeftSidebar = ref(false)
const showRightSidebar = ref(false)


const toggleLeftSidebar = () => {
    if (showLeftSidebar.value) {
        showLeftSidebar.value = false;
    } else {
        showLeftSidebar.value = true;
    }
}

const toggleRightSidebar = () => {
    if (showRightSidebar.value) {
        showRightSidebar.value = false;
    } else {
        showRightSidebar.value = true;
    }
}


const handleResize = () => {
    if (window.innerWidth < 1024) {
        showLeftSidebar.value = false;
        showRightSidebar.value = false;
    } else {
        showLeftSidebar.value = true;
        showRightSidebar.value = true;
    }
}
onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
})
</script>