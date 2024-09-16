<template>
    <div class="flex min-h-full flex-1 flex-col lg:justify-center p-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-center text-2xl font-bold text-gray-900">¡Hola! Ingresa tus credenciales para acceder a tu cuenta</h2>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-sm py-4 block text-sm font-semibold text-red-600">
            {{ authenticationError }}
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="login">
                <div>
                    <label for="email-username" class="block text-sm font-medium text-gray-900">Nombre de usuario o email</label>
                    <div class="mt-2">
                        <input id="email-username" name="email-username" type="text" required="true" class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium text-gray-900">Contraseña</label>
                    </div>

                    <div class="mt-2">
                        <input id="password" name="password" type="password" required="true" class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm" />
                    </div>
                </div>

                <div class="pt-6">
                    <button type="submit" class="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Ingresar</button>
                </div>
            </form>

            <div class="mt-3">
                <button @click="router.push({ path: '/register' })" class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm border hover:border-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">No tengo una cuenta ¡Registrarme!</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { useAlertLoading } from '@/composables/useAlert';

const router = useRouter()
const user = useUserStore()
const alertLoading = useAlertLoading()
const authenticationError = ref<string | null>(null)

const login = async (e: Event) => {
    alertLoading.show()

    const formData = new FormData(e.target as HTMLFormElement)

    try {
        await user.login(formData)
        router.push('/')
    } catch (error: any) {
        authenticationError.value = error.response.data?.detail || 'Ocurrió un error al intentar iniciar sesión'
    } finally {
        alertLoading.hide()
    }
}
</script>
