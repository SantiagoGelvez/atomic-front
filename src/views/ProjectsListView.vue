<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Lista de Proyectos</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="project in projects" :key="project.id" class="bg-white shadow-md rounded-lg p-4">
                <h2 class="text-xl font-semibold mb-2">{{ project.name }}</h2>
                <p class="text-gray-700 mb-4">{{ project.description }}</p>
                <router-link :to="'/projects/' + project.link" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Ver Detalles
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Project {
    id: number;
    name: string;
    description: string;
    link: string;
}

const projects = ref<Project[]>([
    { id: 1, name: 'Proyecto 1', description: 'Descripción del Proyecto 1', link: '1' },
    { id: 2, name: 'Proyecto 2', description: 'Descripción del Proyecto 2', link: '2' },
    { id: 3, name: 'Proyecto 3', description: 'Descripción del Proyecto 3', link: '3' },
    // Agrega más proyectos según sea necesario
]);
</script>
