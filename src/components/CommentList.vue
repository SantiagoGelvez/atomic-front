<template>
    <div>
        <ul>
            <li v-for="comment in comments" :key="comment.uuid" class="mb-4">
                <div class="p-2 border border-gray-300 rounded">
                    <p><strong>{{ `${comment.user.first_name} ${comment.user.last_name}` }}</strong>: {{ comment.text }}</p>
                    <p>
                        <img v-if="comment.image_s3_key" :src="comment.image_s3_key" alt="Imagen" class="w-32 h-32" />
                        <audio v-if="comment.audio_s3_key" :src="comment.audio_s3_key" controls></audio>
                    </p>
                </div>
                
                <ul v-if="comment.replies" class="ml-4 mt-2">
                    <li v-for="reply in comment.replies" :key="reply.uuid" class="p-2 border border-gray-300 rounded">
                        <p><strong>{{ `${reply.user.first_name} ${reply.user.last_name}` }}</strong>: {{ reply.text }}</p>
                        
                        <p>
                            <img v-if="reply.image_s3_key" :src="reply.image_s3_key" alt="Imagen" class="w-32 h-32" />
                            <audio v-if="reply.audio_s3_key" :src="reply.audio_s3_key" controls></audio>
                        </p>
                    </li>
                </ul>

                <div class="flex justify-end gap-2 w-full">
                    <InputComplete @send="(formData: FormData) => submitReply(formData, comment.uuid)"></InputComplete>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputComplete from '@/components/utils/InputComplete.vue';

interface Comment {
    uuid: string;
    text: string;
    image: string | null;
    image_s3_key: any | null;
    audio: string | null;
    audio_s3_key: any | null;
    user: any;
    reply_to: string | null;
    x: number | null;
    y: number | null;
    revision: string;
    replies: Comment[]
}

const props = defineProps<{ comments: Comment[] }>();
const emit = defineEmits<{ (e: 'add-reply', parentUuid: string, formData: FormData): void }>();

// const replyText = ref<string>('');

const replies = ref<{ [key: string]: string }>({});

const submitReply = (formData: FormData, uuid: string) => {
    emit('add-reply', uuid, formData);
};
</script>
