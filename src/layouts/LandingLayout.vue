<template>
    <div class="min-h-screen flex flex-col w-full">
        <ProjectsHeader />
        <main class="flex-grow h-[calc(100vh-4rem)] bg-gray-50 overflow-auto" style="height: calc(100vh - 5rem);">
            <div class="h-full">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import ProjectsHeader from '@/components/ProjectsHeader.vue';
</script>
