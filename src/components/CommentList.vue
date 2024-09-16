<template>
    <div>
        <ul>
            <li v-for="comment in comments" :key="comment.uuid" class="mb-4">
                <div class="p-2 border border-gray-300 rounded">
                    <p><strong>{{ comment.user }}</strong>: {{ comment.text }}</p>
                </div>
                
                <ul v-if="comment.replies.length > 0" class="ml-4 mt-2">
                    <li v-for="reply in comment.replies" :key="reply.uuid" class="p-2 border border-gray-300 rounded">
                        <p><strong>{{ reply.user }}</strong>: {{ reply.text }}</p>
                    </li>
                </ul>

                <div class="flex gap-2">
                    <input v-model="replies[comment.uuid]" @keyup.enter="submitReply(comment.uuid)" type="text" placeholder="Reply" class="w-full p-2 border border-gray-300 rounded" />
                    <button @click="submitReply(comment.uuid)" class="text-blue-500">Reply</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Comment {
    uuid: string;
    text: string;
    image: string | null;
    audio: string | null;
    user: string;
    reply_to: string | null;
    x: number | null;
    y: number | null;
    revision: string;
    replies: Comment[]
}

const props = defineProps<{ comments: Comment[] }>();
const emit = defineEmits<{ (e: 'add-reply', parentUuid: string, replyText: string): void }>();

// const replyText = ref<string>('');

const replies = ref<{ [key: string]: string }>({});

const submitReply = (uuid: string) => {
    if (replies.value[uuid]?.trim() !== '') {
        emit('add-reply', uuid, replies.value[uuid]);
        replies.value[uuid] = '';
    }
};
</script>
