<template>
    <div class="min-h-screen flex flex-col w-full">
        <ProjectsHeader />
        <main class="flex-grow h-full bg-gray-50" style="height: calc(100vh - 5rem);">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import ProjectsHeader from '@/components/ProjectsHeader.vue';
</script>
