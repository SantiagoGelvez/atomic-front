<template>
    <div class="">
        <div class="py-16 text-center">
            <h1 class="text-5xl font-bold">Bienvenido a AtomicLab</h1>
            
            <p class="mt-4 text-xl">Conecta con los mejores diseñadores web para tus proyectos</p>
        </div>
        
        <div class="container mx-auto px-24">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div v-for="card in cards" class="bg-white p-8 rounded-lg shadow-md">
                    <img :src="card.image" :alt="card.title" class="w-full h-80 object-cover rounded mb-4">
                    
                    <h2 class="text-3xl font-bold mb-4">{{ card.title }}</h2>
                    
                    <p class="text-gray-700 mb-4">
                        {{ card.description }}
                    </p>
                    
                    <div class="flex justify-end">
                        <button class="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:opacity-75" @click="router.push({path: 'register', query: {type: card.type}})">
                            {{ card.action }}
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

const cards = [
    {
        title: 'Para Diseñadores',
        description: 'Únete a nuestra comunidad de diseñadores y encuentra proyectos emocionantes para trabajar. Muestra tu portafolio y conecta con clientes que buscan tus habilidades.',
        image: 'https://santigelvez-portfolio-bucket.s3.us-east-2.amazonaws.com/utils/designer_atomic.png',
        action: 'Únete Ahora',
        type: 'designer'
    },
    {
        title: 'Para Clientes',
        description: 'Encuentra al diseñador perfecto para tu proyecto. Explora portafolios, revisa trabajos anteriores y contrata al mejor talento para llevar tu visión a la realidad.',
        image: 'https://santigelvez-portfolio-bucket.s3.us-east-2.amazonaws.com/utils/team_atomic.png',
        action: 'Encuentra un Diseñador',
        type: 'client'
    }
];
</script>