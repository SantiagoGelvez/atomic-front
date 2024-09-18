<template>
    <div class="items-center space-x-2">

        <div class="flex flex-col justify-center">
            <img v-if="imageUrl" :src="imageUrl" alt="Imagen" class="w-32 h-32 mx-auto pb-2" />
            <audio v-if="audioUrl" :src="audioUrl" controls class="pb-2"></audio>
        </div>

        <div class="flex gap-2">
            <textarea v-model="message" 
            class="w-full resize-none rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Escribe un mensaje..." 
            rows="1"></textarea>
            
            <!-- Botón para subir imagen -->
            <input type="file" @change="handleFileChange" class="hidden" ref="imageInput" accept="image/*">
            <button @click="uploadImage" class="flex items-center text-blue-500">
                <PhotoIcon class="size-6 text-purple-500"/>
            </button>
            
            <!-- Botón para grabar audio -->
            <button @click="recordAudio" class="flex items-center text-blue-500">
                <StopCircleIcon v-if="mediaRecorder && mediaRecorder.state == 'recording'" class="size-6 text-red-400 animate-pulse" />
                <MicrophoneIcon v-else class="size-6 text-purple-500"/>
            </button>
            
            <!-- Botón para enviar -->
            <button @click="sendMessage" class="">
                <PaperAirplaneIcon class="size-6 text-purple-500"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
import { MicrophoneIcon, PhotoIcon, PaperAirplaneIcon, StopCircleIcon } from '@heroicons/vue/16/solid';

const props = defineProps<{
    initialMessage?: string
}>()

const emits = defineEmits<{
    (e: 'send', formData: FormData): void
}>()

const message = ref<string>(props.initialMessage || '')
const image = ref<File | null>(null)
const imageUrl = ref<string | null>(null)
const audioBlob = ref<Blob | null>(null)
const audioUrl = ref<string | null>(null)
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])

const uploadImage = () => {
    const input = imageInput.value
    if (input) input.click()
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files) {
        image.value = target.files[0]
        imageUrl.value = URL.createObjectURL(image.value)
    }
}

const recordAudio = () => {
    if (!mediaRecorder.value) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorder.value = new MediaRecorder(stream)
            mediaRecorder.value.ondataavailable = (event) => {
                audioChunks.value.push(event.data)
            }
            mediaRecorder.value.onstop = () => {
                audioBlob.value = new Blob(audioChunks.value, { type: 'audio/mpeg' })
                audioUrl.value = URL.createObjectURL(audioBlob.value)
                audioChunks.value = []  // Limpiar para la siguiente grabación
            }
            mediaRecorder.value.start()
        })
    } else if (mediaRecorder.value.state === 'recording') {
        mediaRecorder.value.stop()
    }
}

const sendMessage = () => {
    const formData = new FormData()
    
    if (message.value) {
        formData.append('message', message.value)
    }
    
    if (image.value) {
        formData.append('image', image.value)
    }
    
    if (audioBlob.value) {
        formData.append('audio', audioBlob.value)
    }

    message.value = ''
    image.value = null
    imageUrl.value = null
    
    emits('send', formData)
}

const imageInput = ref<HTMLInputElement | null>(null)
</script>
