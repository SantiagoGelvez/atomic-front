<template>
    <div class="container mx-auto px-20 py-8">
        <h1 class="text-2xl font-bold mb-4">Detalles del Proyecto</h1>
        
        <h2 class="text-xl font-bold mt-8 mb-4">Información General</h2>

        <div class="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">{{ projectDetails.name }}</h2>
            <p class="text-gray-700 mb-2">{{ projectDetails.description }}</p>
            <p class="text-gray-700 mb-2 text-sm">Creado por: {{ projectDetails.creator?.first_name }} {{ projectDetails.creator?.last_name }}</p>
            <p class="text-gray-700 mb-4 text-sm">Fecha de Creación: {{ projectDetails.created_at }}</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Revisiones del Proyecto</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="revision in revisions" :key="revision.uuid" class="bg-white shadow-md rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-2">{{ `Revision No. ${revision.attempt}` }}</h2>

                <img :src="revision.file_s3_key" alt="">

                <p class="text-gray-700 mb-4">{{ revision.created_at }}</p>
                
                <div class="flex justify-end">
                    <router-link :to="'/projects/' + projectUUID + '/revisions/' + revision.uuid" class="bg-purple-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded-full">
                        Ver Detalles
                    </router-link>
                </div>
            </div>

            <div class="bg-white shadow-md rounded-lg p-6 flex items-center justify-center hover:opacity-75 cursor-pointer" @click="newRevisionModalIsOpen = true">
                <span class="py-2 px-4 rounded-full font-bold">
                    + Agregar Nueva Revisión
                </span>
            </div>
        </div>
        
        <Modal :isOpen="newRevisionModalIsOpen">
            <template #title>
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Adjunta los archivos de tu nueva revisión
                </h3>
            </template>

            <template #content>
                <div class="text text-gray-500">
                    <form @submit.prevent="addRevision" ref="newRevisionForm">
                        <div class="mb-4">
                            <label for="file" class="block text-sm font-medium text-gray-700">Adjuntar Archivo</label>
                            <input type="file" id="file" name="file" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 sm:text-sm" required>
                        </div>
                    </form>
                </div>
            </template>

            <template #footer>
                <div class="flex justify-between gap-4">
                    <button type="button" class="w-full rounded-full border px-4 py-2 text-gray-700 hover:bg-gray-100" @click="newRevisionModalIsOpen = false">
                        {{ "Cancelar" }}
                    </button>

                    <button type="submit" class="w-full rounded-full border px-4 py-2 text-white bg-purple-700 hover:opacity-75" @click="submitForm">
                        {{ "Agregar Revisión" }}
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/plugins/axios';
import { useAlertLoading } from '@/composables/useAlert';
import Swal from 'sweetalert2';
import Modal from '@/components/utils/HModal.vue';

const alertLoading = useAlertLoading();

const route = useRoute();
const projectUUID = route.params.projectUUID;
const newRevisionModalIsOpen = ref(false);
const newRevisionForm = ref<any>(null);

const projectDetails = ref<any>({})
const revisions = ref<any>([]);


const submitForm = () => {
    newRevisionForm.value.dispatchEvent(new Event('submit'));
};


const addRevision = async (f: Event) => {
    alertLoading.show();
    try {
        const formData = new FormData(newRevisionForm.value);
        
        const response = await axiosInstance.post(`/projects/${projectUUID}/revisions`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        Swal.fire('Revisión Agregada', 'La revisión ha sido agregada exitosamente', 'success');
        revisions.value.push(response.data);
        newRevisionModalIsOpen.value = false;
    } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al agregar la revisión', 'error');
    }
};

const getProjectDetails = async () => {
    alertLoading.show();
    try {
        const response = await axiosInstance.get(`/projects/${projectUUID}`);
        projectDetails.value = response.data;

        const revisionsResponse = await axiosInstance.get(`/projects/${projectUUID}/revisions`);
        revisions.value = revisionsResponse.data;
    } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al obtener los detalles del proyecto', 'error');
    } finally {
        alertLoading.hide();
    }
};

getProjectDetails();
</script>
