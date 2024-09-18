<template>
    <div class="mx-auto px-20 py-8">
        <h1 class="text-2xl font-bold mb-8">Lista de Proyectos</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="project in projects" :key="project.uuid" class="bg-white shadow-md rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-2">{{ project.name }}</h2>

                <p class="text-gray-700 mb-4">{{ project.description }}</p>
                
                <div class="flex justify-end">
                    <router-link :to="'/projects/' + project.uuid" class="bg-purple-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded-full">
                        Ver Detalles
                    </router-link>
                </div>
            </div>

            <!-- Agrega más proyectos según sea necesario -->

            <div class="bg-white shadow-md rounded-lg p-6 flex items-center justify-center hover:opacity-75 cursor-pointer" @click="newProjectModalIsOpen = true">
                <span class="py-2 px-4 rounded-full font-bold">
                    + Crear Nuevo Proyecto
                </span>
            </div>
        </div>
    </div>

    <Modal :isOpen="newProjectModalIsOpen">
        <template #title>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Agrega un Nuevo Proyecto
            </h3>
        </template>

        <template #content>
            <div class="text text-gray-500">
                <form @submit.prevent="createNewProject" ref="newProjectForm">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Nombre del Proyecto</label>
                        <input type="text" id="name" name="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 sm:text-sm" required>
                    </div>

                    <div class="mb-4">
                        <label for="description" class="block text-sm font-medium text-gray-700">Descripción del Proyecto</label>
                        <textarea id="description" name="description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 sm:text-sm" required></textarea>
                    </div>
                </form>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-between gap-4">
                <button type="button" class="w-full rounded-full border px-4 py-2 text-gray-700 hover:bg-gray-100" @click="newProjectModalIsOpen = false">
                    {{ "Cancelar" }}
                </button>

                <!-- subnit form in another div -->
                <button type="submit" class="w-full rounded-full border px-4 py-2 text-white bg-purple-700 hover:opacity-75" @click="submitForm">
                    {{ "Crear Proyecto" }}
                </button>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/utils/HModal.vue';
import axiosInstance from '@/plugins/axios';
import { useAlertLoading } from '@/composables/useAlert';
import Swal from 'sweetalert2';

const alertLoading = useAlertLoading();
const newProjectModalIsOpen = ref(false);
const newProjectForm = ref<HTMLFormElement | null>(null);

const projects = ref<any>([]);

const getProjects = async () => {
    alertLoading.show();
    try {
        const response = await axiosInstance.get('projects/');

        if (response.status === 200) {
            projects.value = response.data;
        }
    } catch (error) {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los proyectos', 'error');
    } finally {
        alertLoading.hide();
    }
};

const submitForm = () => {
    if (newProjectForm.value) {
        newProjectForm.value.dispatchEvent(new Event('submit'));
    }
};

const createNewProject = (f: Event) => {
    const formData = new FormData(f.target as HTMLFormElement);

    Swal.fire({
        title: '¿Estás seguro de crear un nuevo proyecto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
    }).then( async (result) => {
        if (result.isConfirmed) {
            alertLoading.show();
            try {
                const response = await axiosInstance.post('projects/', formData);

                if (response.status === 201) {
                    projects.value.push(response.data);
                    Swal.fire('Proyecto creado', 'El proyecto ha sido creado exitosamente', 'success');
                }
            } catch (error) {
                Swal.fire('Error', 'Ha ocurrido un error al crear el proyecto', 'error');
            } finally {
                alertLoading.hide();
            }
        }
    });
};

getProjects();
</script>
