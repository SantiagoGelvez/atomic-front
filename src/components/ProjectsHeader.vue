<template>
    <header class="p-4 flex justify-between items-center h-16 shadow z-[1]">
        <div class="text-lg font-bold">
            <router-link to="/" class="hover:text-purple-700 font-bold text-2xl">AtomicLab</router-link>
        </div>

        <div class="flex gap-2">
            <button class="text-white font-bold py-2 px-4 rounded-full border bg-purple-700 hover:opacity-75">
                Iniciar Sesión
            </button>
            
            <button class="text-zinc-950 font-bold py-2 px-4 rounded-full border bg-purple-100 hover:opacity-75">
                Registrarme
            </button>
        </div>
    </header>
</template>
