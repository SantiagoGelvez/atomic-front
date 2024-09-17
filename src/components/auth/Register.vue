<template>
    <div class="flex min-h-full flex-1 flex-col justify-center p-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-center text-2xl font-bold text-gray-900">{{ route.query.type == 'designer' ? '¡Hola Designer! Registrate' :  '¡Hola! Resgistrate ' }}</h2>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-sm pt-6 block text-sm font-medium text-red-600">
            {{ authenticationError }}
        </div>
        
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-4" @submit.prevent="register">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-900">Nombre de usuario</label>
                    <div class="mt-1">
                        <input id="username" name="username" type="text" required="true" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <div class="flex items-center gap-2 justify-between">
                    <div>
                        <label for="first-name" class="block text-sm font-medium text-gray-900">Nombres</label>
                        <div class="mt-1">
                            <input id="first-name" name="first_name" type="text" required="true" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                        </div>
                    </div>
                    
                    <div>
                        <label for="last-name" class="block text-sm font-medium text-gray-900">Apellidos</label>
                        <div class="mt-1">
                            <input id="last-name" name="last_name" type="text" required="true" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                        </div>
                    </div>
                </div>
                
                <div v-if="route.query.type == 'seller'">
                    <label for="identification" class="block text-sm font-medium text-gray-900">Identificación</label>
                    <div class="mt-1">
                        <input id="identification" name="identification" type="text" required="true" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
                    <div class="mt-1">
                        <input id="email" name="email" type="email" required="true" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-900">Contraseña</label>
                    <div class="mt-1">
                        <input id="password" name="password" type="password" required="true" autocomplete="off" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <label for="companies" class="block text-sm font-medium text-gray-900">Empresa</label>
                    <HCombobox id="companies" :items="companies" :fixedOption="fixedOption" valueItem="uuid" valueText="name" @on-value-selected="assignCompany"/>
                </div>

                <hr>

                <div v-if="companyAssigned?.uuid === 'New'">
                    <label for="companyName" class="block text-sm font-medium text-gray-900">Nombre de la empresa</label>
                    <div class="mt-1">
                        <input id="companyName" name="company_name" type="text" required="true" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <div v-if="companyAssigned?.uuid === 'New'">
                    <label for="companyDescription" class="block text-sm font-medium text-gray-900">Descripción de la empresa</label>
                    <div class="mt-1">
                        <input id="companyDescription" name="company_description" type="text" required="true" autocomplete="off" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <div v-if="companyAssigned?.uuid === 'New'">
                    <label for="companyWebsite" class="block text-sm font-medium text-gray-900">Website de la empresa</label>
                    <div class="mt-1">
                        <input id="companyWebsite" name="company_website" type="text" required="true" autocomplete="off" class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <hr>
                
                <div class="pt-6">
                    <button type="submit" class="flex w-full justify-center rounded-full bg-purple-500 px-4 py-2 font-bold text-white shadow-sm hover:opacity-75">Registrarme</button>
                </div>
            </form>

            <div class="my-4">
                <button @click="router.push({path: '/login'})" class="flex w-full justify-center rounded-full px-4 py-2 text-gray-900 shadow-sm border hover:border-purple-500">Iniciar sesión en mi cuenta</button>
            </div>

            <div class="my-4" v-if="route.query.type == 'designer'">
                <button @click="router.push({path: '/register', query: {type: 'client'}})" class="flex w-full justify-center rounded-full px-4 py-2 text-gray-900 shadow-sm border hover:border-purple-500">¡No soy Diseñador! Registrarme como otro tipo usuario</button>
            </div>

            <div class="my-4" v-else="route.query.type == 'client'">
                <button @click="router.push({path: '/register', query: {type: 'designer'}})" class="flex w-full justify-center rounded-full px-4 py-2 text-gray-900 shadow-sm border hover:border-purple-500">¡Soy Diseñador! Quiero registrarme</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter, useRoute } from 'vue-router';

import { useUserStore } from '@/stores/user';
import { useAlertLoading } from '@/composables/useAlert';
import HCombobox from '@/components/utils/HCombobox.vue';
import apiClient from '@/plugins/axios';

interface Company {
    uuid: string;
    name: string;
    website: string;
    description: string;
}

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const alertLoading = useAlertLoading()
const companies = ref<Company[]>([])
// const companyAssigned = ref<Company | null>(null)

const fixedOption = {
    uuid: 'New',
    name: '¿No encuentras tu empresa? Registra una nueva',
    website: '',
    description: ''
}

const companyAssigned = ref<Company>(fixedOption)

const authenticationError = ref('')

const register = async (e: Event) => {
    alertLoading.show()

    const formData = new FormData(e.target as HTMLFormElement)
    formData.append('is_designeer', route.query.type == 'designer' ? 'true' : 'false')
    formData.append('company_uuid', companyAssigned.value.uuid)
    
    try {
        await user.register(formData)
        Swal.fire({
            title: '¡Registro exitoso!',
            text: 'En un momento serás redirigido a la página de inicio de sesión',
            icon: 'success',
            timer: 2000,
            confirmButtonText: 'Aceptar'
        }).then(() => {
            router.push({name: 'login'})
        })

    } catch (error: any) {
        alertLoading.hide()
        authenticationError.value = error?.response?.data?.detail ? 'El email ya se encuentra registrado' : 'Ha ocurrido un error, por favor intenta nuevamente'
    }
}       

const getCompanies = async () => {
    try {
        const response = await apiClient.get('companies')
        companies.value = response.data
    } catch (error: any) {
        Swal.fire({
            title: '¡Error!',
            text: 'Ha ocurrido un error al cargar las empresas, por favor intente nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}

const assignCompany = (company: any) => {
    companyAssigned.value = company
}

getCompanies()
</script>
