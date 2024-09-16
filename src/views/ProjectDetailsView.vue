<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Detalles del Proyecto</h1>
        <ul class="list-disc pl-5">
            <li v-for="(detail, index) in projectDetails" :key="index" class="mb-2">
                <span class="font-semibold">{{ detail.label }}:</span> {{ detail.value }}
            </li>
        </ul>

        <h2 class="text-xl font-bold mt-8 mb-4">Revisiones del Proyecto</h2>
        <ul class="list-disc pl-5">
            <li v-for="(revision, index) in revisions" :key="index" class="mb-2">
                <span class="font-semibold">{{ revision.date }}:</span> {{ revision.description }}
                <router-link :to="projectUUID +'/revisions/' + revision.uuid" class="text-blue-500 hover:underline ml-2">Ver más</router-link>
            </li>
        </ul>
        <h2 class="text-xl font-bold mt-8 mb-4">Agregar Nueva Revisión</h2>
        <form @submit.prevent="addRevision" class="mb-4">
            <div class="mb-2">
                <label for="revisionDate" class="block font-semibold">Fecha:</label>
                <input v-model="newRevision.date" type="date" id="revisionDate" class="border rounded p-2 w-full">
            </div>

            <div class="mb-2">
                <label for="revisionDescription" class="block font-semibold">Descripción:</label>
                <textarea v-model="newRevision.description" id="revisionDescription" class="border rounded p-2 w-full"></textarea>
            </div>

            <div class="mb-2">
                <label for="revisionFile" class="block font-semibold">Adjuntar Archivo:</label>
                <input @change="handleFileUpload" type="file" id="revisionFile" class="border rounded p-2 w-full">
            </div>
            
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Agregar Revisión</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectUUID = route.params.projectUUID;

const projectDetails = ref([
    { label: 'Nombre del Proyecto', value: 'Proyecto Atomic'},
    { label: 'Descripción', value: 'Este es un proyecto de ejemplo para mostrar detalles.'},
    { label: 'Fecha de Inicio', value: '2023-01-01'},
    { label: 'Fecha de Finalización', value: '2023-12-31'},
    { label: 'Estado', value: 'En progreso'},
]);

const revisions = ref([
    { id: 1, date: '2023-01-15', description: 'Primera revisión del proyecto', uuid: '1' },
    { id: 2, date: '2023-02-15', description: 'Segunda revisión del proyecto', uuid: '2' },
    { id: 3, date: '2023-03-15', description: 'Tercera revisión del proyecto', uuid: '3' },
    // Agrega más revisiones según sea necesario
]);

const newRevision = ref({
    date: '',
    description: '',
});

const addRevision = () => {
    if (newRevision.value.date && newRevision.value.description) {
        revisions.value.push({
            id: revisions.value.length + 1,
            date: newRevision.value.date,
            description: newRevision.value.description,
            uuid: (revisions.value.length + 1).toString(),
        });
        newRevision.value.date = '';
        newRevision.value.description = '';
    }
};
</script>
