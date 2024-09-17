<template>
    <header class="p-4 flex justify-between items-center h-16 shadow z-[1]">
        <div class="text-lg font-bold">
            <router-link to="/" class="hover:text-purple-700 font-bold text-xl">AtomicLab</router-link>
        </div>

        <div v-if="userStore.isAuthenticated">
            <!-- Nombre y foto de perfil -->
            <div class="flex items-center gap-2">
                <!-- <img :src="" alt="Foto de perfil" class="w-8 h-8 rounded-full"> -->
                <span class="font-semibold">
                    {{ `Hola, ${userStore.first_name}` }}
                </span>

                <button class="text-white text-sm font-semibold py-2 px-4 rounded-full border bg-red-400 hover:opacity-75" @click="userStore.logout()">
                    Cerrar Sesión
                </button>
            </div>
        </div>

        <div v-else class="flex gap-2">
            <button class="text-white font-bold py-2 px-4 rounded-full border bg-purple-700 hover:opacity-75" @click="router.push('login')">
                Iniciar Sesión
            </button>
            
            <button class="text-zinc-950 font-bold py-2 px-4 rounded-full border bg-purple-100 hover:opacity-75" @click="router.push('register')">
                Registrarme
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
</script>