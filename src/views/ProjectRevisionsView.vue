<template>
    <div class="flex h-full bg-gray-100" v-if="revisionDetailed">
        <div class="flex-1 flex flex-col p-4 bg-white w-full align-center">
            <div class="flex items-center mb-4 gap-6" >
                <ArrowLeftIcon class="w-6 h-6 text-purple-500 cursor-pointer" @click="goBack"/>

                <h1 class="text-2xl font-bold ml-2">Revisión # {{ revisionDetailed.attempt }}</h1>
            </div>

            <div class="w-full flex justify-center">
                <div class="w-fit h-fit max-w-5xl max-h-3xl overflow-hidden flex items-center justify-center relative border" @click="handleClick" ref="imageContainer">
                    <img :src="revisionDetailed.file_s3_key" alt="Example Image" class="object-contain"/>
                    
                    <div class="absolute" v-if="newComment.x && newComment.y" :style="{ top: newComment.y + '%', left: newComment.x + '%' }" @click.stop="null"> 
                        <div class="p-2 bg-white border border-gray-300 rounded-xl z-10 relative">
                            <InputComplete :placeholder="'Agrega un comentario...'" @send="addComment" @keydown.esc="newComment={ text: '', x: null, y: null }" ref="floatingAddComment"></InputComplete>
                        </div>
                    </div>
    
                    <div v-for="comment in comments.filter((c) => c.x && c.y)" :key="comment.uuid" class="absolute" :style="{ top: comment.y + '%', left: comment.x + '%' }" @click.stop="openComment(comment.uuid)">
                        <div class="p-4 border-2 border-gray-300 " :class="{'bg-white rounded-lg': showComment[comment.uuid], 'bg-purple-500 rounded-b-full rounded-r-full': !showComment[comment.uuid]}">
                            <div v-if="showComment[comment.uuid]">
                                <h1 class="font-semibold">{{ `${comment.user.first_name} ${comment.user.last_name}` }}</h1>
                                
                                <p>{{ comment.text }}</p>
                                
                                <p>
                                    <img v-if="comment.image_s3_key" :src="comment.image_s3_key" alt="Imagen" class="w-32 h-32" />
                                    
                                    <audio v-if="comment.audio_s3_key" :src="comment.audio_s3_key" controls></audio>
                                </p>
                                
                                <InputComplete :placeholder="'Responder...'" @send="(formData) => addReply(comment.uuid, formData)"></InputComplete>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 flex justify-end">
                <button class="bg-purple-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded-full" @click="submitRevision">
                    Guardar Revisión
                </button>
            </div>
        </div>

        <div class="w-96 p-4 h-full overflow-auto">
            <h1 class="text-xl font-semibold mb-2">Comentarios</h1>

            <p v-if="comments.length === 0">No hay comentarios</p>
            <CommentList :comments="comments" @add-reply="addReply" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CommentList from '@/components/CommentList.vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '@/plugins/axios';
import { useAlertLoading } from '@/composables/useAlert';
import Swal from 'sweetalert2';
import { ArrowLeftIcon } from '@heroicons/vue/16/solid';
import InputComplete from '@/components/utils/InputComplete.vue';
import { useUserStore } from '@/stores/user';

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

const route = useRoute();
const router = useRouter();
const alertLoading = useAlertLoading();

const comments = ref<Comment[]>([]);
const imageContainer = ref<HTMLDivElement | null>(null);
const showComment = ref<{ [key: string]: boolean }>({});
const newReply = ref<{ [key: string]: string }>({});
const revisionDetailed = ref<any>(null);
const allUserComments = ref<Comment[]>([]);
const userStore = useUserStore();

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
    } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al cargar la revisión', 'error');
    } finally {
        alertLoading.hide();
    }
};

const getComments = async () => {
    alertLoading.show();
    try {
        const response = await axiosInstance.get(`/revisions/${revisionUUID}/comments`);
        comments.value = response.data;
    } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al cargar los comentarios', 'error');
    } finally {
        alertLoading.hide();
    }
};

getComments();

getRevisionDetail()

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

const addComment = (formData: FormData) => {
    let message: string | null = null;
    let imageUrl: string | null = null;
    let audioUrl: string | null = null;    
    
    if (formData.get('message')) {
        message = formData.get('message') as string
    }
    
    if (formData.get('image')) {
        const image = formData.get('image') as File
        imageUrl = URL.createObjectURL(image)
    }
    
    if (formData.get('audio')) {
        const audio = formData.get('audio') as Blob
        audioUrl = URL.createObjectURL(audio)
    }

    comments.value.unshift({
        uuid: Date.now().toString(),
        text: message || '',
        image: imageUrl || null,
        image_s3_key: formData.get('image'),
        audio: audioUrl || null,
        audio_s3_key: formData.get('audio'),
        user: userStore,
        x: newComment.value.x,
        y: newComment.value.y,
        reply_to: null,
        revision: 'current_revision',
        replies: []
    });

    allUserComments.value.push(comments.value[0]);

    newComment.value.text = '';
    newComment.value.x = null;
    newComment.value.y = null;
};

const addReply = (parentUuid: string, formData: FormData) => {
    const findComment = (comments: Comment[], uuid: string): Comment | null => {
        for (const comment of comments) {
            if (comment.uuid === uuid) return comment;

            if (comment.replies) {
                const found = findComment(comment.replies, uuid);
                if (found) return found;
            }
        }
        return null;
    };

    const parentComment = findComment(comments.value, parentUuid);
    if (parentComment) {
        parentComment.replies.push({
            uuid: Date.now().toString(),
            text: formData.get('message') as string,
            image: formData.get('image') ? URL.createObjectURL(formData.get('image') as File) : null,
            image_s3_key: formData.get('image'),
            audio: formData.get('audio') ? URL.createObjectURL(formData.get('audio') as Blob) : null,
            audio_s3_key: formData.get('audio'),
            x: null,
            y: null,
            user: userStore,
            reply_to: parentUuid,
            revision: 'current_revision',
            replies: []
        });

        allUserComments.value.push(parentComment.replies[parentComment.replies.length - 1]);

        newReply.value[parentUuid] = '';
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

const submitRevision = async () => {
    alertLoading.show();

    for (const comment of allUserComments.value) {
        await addUserComments(comment);
    }

    alertLoading.hide();
    Swal.fire('Revisión Guardada', 'La revisión ha sido guardada exitosamente', 'success');
};

const addUserComments = async (comment: Comment) => {
    const formData = new FormData();
    formData.append('text', comment.text);
    formData.append('x', comment.x?.toString() || '');
    formData.append('y', comment.y?.toString() || '');
    formData.append('image_s3_key', comment.image_s3_key || '');
    formData.append('audio_s3_key', comment.audio_s3_key || '');
    formData.append('reply_to', comment.reply_to || '');

    try {
        await axiosInstance.post(`/revisions/${revisionUUID}/comments`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al guardar la revisión', 'error');
    }
}

const goBack = () => {
    if (allUserComments.value.length > 0) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Si regresas perderás los cambios no guardados',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, regresar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.back();
            }
        });
    } else {
        router.back();
    }
}
</script>
