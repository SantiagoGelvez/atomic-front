<template>
    <div class="container mx-auto px-20 py-8">
        <h1 class="text-2xl font-bold mb-8">Lista de Proyectos</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="project in projects" :key="project.id" class="bg-white shadow-md rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-2">{{ project.name }}</h2>

                <p class="text-gray-700 mb-4">{{ project.description }}</p>
                
                <div class="flex justify-end">
                    <router-link :to="'/projects/' + project.link" class="bg-purple-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded-full">
                        Ver Detalles
                    </router-link>
                </div>
            </div>

            <!-- Agrega más proyectos según sea necesario -->

            <div class="bg-white shadow-md rounded-lg p-6 flex items-center justify-center hover:opacity-75 cursor-pointer">
                <span class="py-2 px-4 rounded-full font-bold">
                    + Crear Nuevo Proyecto
                </span>
            </div>
        </div>
    </div>


    <!-- 
    const props = defineProps({
    isOpen: Boolean,
    title: String,
    content: String,
    primaryButtonText: String,
    secondaryButtonText: String,
});
     -->
    <Modal :isOpen="true" :title="'Titulo del Modal'" :content="'Contenido del modal'" :primaryButtonText="'Crear'" :secondaryButtonText="'Cancelar'" @close="console.log('cerrar modal')"  @primaryAction="console.log('Aceptar')" @secondaryAction="console.log('Cancelado')">

    </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/utils/HModal.vue';

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
