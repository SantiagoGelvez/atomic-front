<template>
    <div class="flex h-screen">
        <div class="flex-1 flex items-center justify-center">
            <div class="w-fit h-fit max-w-4xl max-h-4xl overflow-hidden flex items-center justify-center relative" @click="handleClick" ref="imageContainer">
                <img :src="revisionDetailed.file_s3_key" alt="Example Image" class="object-contain"/>
                
                <!-- Los contenedores con v-if deben ocultarse al hacer click por fuera del contenedor padre, el que tiene handleclick -->
                <div class="absolute" v-if="newComment.x && newComment.y" :style="{ top: newComment.y + '%', left: newComment.x + '%' }" @click.stop="null"> 
                    <div class="p-2 bg-white border border-gray-300 rounded">
                        <input v-model="newComment.text" @keyup.enter="addComment" @keydown.esc="newComment={ text: '', x: null, y: null }" type="text" placeholder="Add a comment" class="w-full p-2 border border-gray-300 rounded" ref="floatingAddComment"/>
                    </div>
                </div>

                <div v-for="comment in comments.filter((c) => c.x && c.y)" :key="comment.uuid" class="absolute " :style="{ top: comment.y + '%', left: comment.x + '%' }" @click.stop="openComment(comment.uuid)">
                    <div class="p-2 bg-white border border-gray-300 rounded">
                        <div v-if="showComment[comment.uuid]">
                            <h1 class="font-semibold">{{ comment.user }}</h1>
                            <hr>
                            <p>{{ comment.text }}</p>
                            <input type="text" @keydown.esc="showComment[comment.uuid] = false" @keyup.enter="addReply(comment.uuid, newReply[comment.uuid])" v-model="newReply[comment.uuid]" class="w-full p-1 border border-gray-300 rounded">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-2/6 p-4 bg-gray-100 overflow-y-auto">
            <input v-model="newComment.text" @keyup.enter="addComment" type="text" placeholder="Add a comment" class="w-full p-2 border border-gray-300 rounded"/>
            <CommentList :comments="comments" @add-reply="addReply" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CommentList from '@/components/CommentList.vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/plugins/axios';
import { useAlertLoading } from '@/composables/useAlert';
import Swal from 'sweetalert2';


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

const route = useRoute();
const alertLoading = useAlertLoading();

const comments = ref<Comment[]>([]);
const imageContainer = ref<HTMLDivElement | null>(null);
const showComment = ref<{ [key: string]: boolean }>({});
const newReply = ref<{ [key: string]: string }>({});
const revisionDetailed = ref<any>(null);

const revisionUUID = route.params.revisionUUID;

const newComment = ref<{
    text: string,
    x: number | null,
    y: number | null
}>({ text: '', x: null, y: null });

const getRevisionDetail = async () => {
    alertLoading.show();
    try {
        const response = await axiosInstance.get(`/revisions/${revisionUUID}`);
        revisionDetailed.value = response.data;
        // comments.value = response.data.comments;
    } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al cargar la revisión', 'error');
    } finally {
        alertLoading.hide();
    }
};

getRevisionDetail()

const addComment = () => {
    if (newComment.value.text.trim() !== '') {
        comments.value.unshift({
            uuid: Date.now().toString(),
            text: newComment.value.text,
            image: null,
            audio: null,
            user: 'current_user',
            x: newComment.value.x,
            y: newComment.value.y,
            reply_to: null,
            revision: 'current_revision',
            replies: []
        });
        newComment.value.text = '';
        newComment.value.x = null;
        newComment.value.y = null;
    }
};

const addReply = (parentUuid: string, replyText: string) => {
    const findComment = (comments: Comment[], uuid: string): Comment | null => {
        for (const comment of comments) {
            if (comment.uuid === uuid) return comment;
            const found = findComment(comment.replies, uuid);
            if (found) return found;
        }
        return null;
    };

    const parentComment = findComment(comments.value, parentUuid);
    if (parentComment) {
        parentComment.replies.push({
            uuid: Date.now().toString(),
            text: replyText,
            image: null,
            audio: null,
            x: null,
            y: null,
            user: 'current_user',
            reply_to: parentUuid,
            revision: 'current_revision',
            replies: []
        });

        newReply.value[parentUuid] = '';
    }
};

const handleClick = (e: MouseEvent) => {
    showComment.value = {};

    if (imageContainer.value) {
        const rect = imageContainer.value.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        newComment.value.x = x;
        newComment.value.y = y;
    }
};

const openComment = (uuid: string) => {
    closeComments()

    showComment.value[uuid] = true;
};

const closeComments = () => {
    showComment.value = {};
    newComment.value = { text: '', x: null, y: null };
}

onMounted(() => {
    window.addEventListener('click', (e) => {
        if (imageContainer.value && !imageContainer.value.contains(e.target as Node)) {
            closeComments()
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            closeComments()
        }
    });
});
</script>
