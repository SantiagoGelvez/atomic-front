<template>
    <div class="min-h-fit">
        <div class="py-20 text-center">
            <h1 class="text-5xl font-bold">Bienvenido a AtomicLab</h1>
            
            <p class="mt-4 text-xl">Conecta con los mejores diseñadores web para tus proyectos</p>
        </div>
        
        <div class="container mx-auto py-16 px-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <img src="https://via.placeholder.com/400x300" alt="Diseñadores" class="w-full h-48 object-cover rounded mb-4">
                    
                    <h2 class="text-3xl font-bold mb-4">Para Diseñadores</h2>
                    
                    <p class="text-gray-700 mb-4">
                        Únete a nuestra comunidad de diseñadores y encuentra proyectos emocionantes para trabajar. 
                        Muestra tu portafolio y conecta con clientes que buscan tus habilidades.
                    </p>
                    
                    <div class="flex justify-end">
                        <button class="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:opacity-75" @click="router.push({path: 'register', query: {type: 'designer'}})">
                            Únete Ahora
                        </button>
                    </div>
                </div>
                
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <img src="https://via.placeholder.com/400x300" alt="Clientes" class="w-full h-48 object-cover rounded mb-4">
                    
                    <h2 class="text-3xl font-bold mb-4">Para Clientes</h2>
                    
                    <p class="text-gray-700 mb-4">
                        Encuentra al diseñador perfecto para tu proyecto. Explora portafolios, revisa trabajos anteriores 
                        y contrata al mejor talento para llevar tu visión a la realidad.
                    </p>

                    <div class="flex justify-end">
                        <button class="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:opacity-75" @click="router.push({path: 'register'})">
                            Encuentra un Diseñador
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>