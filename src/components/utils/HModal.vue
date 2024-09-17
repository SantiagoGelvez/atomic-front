<template>
    <TransitionRoot as="template" :show="isOpen" @close="closeModal">
        <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="closeModal">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:align-middle sm:max-w-lg sm:w-full sm:p-4">
                        <div>
                            <div class="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                    <slot name="title"></slot>
                                </DialogTitle>
                                <div class="mt-2 py-4">
                                    <slot name="content"></slot>
                                </div>
                            </div>
                        </div>

                        <footer class="w-full py-2">
                            <slot name="footer"></slot>
                        </footer>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

const props = defineProps({
    isOpen: Boolean,
    title: String,
    content: String,
    primaryButtonText: String,
    secondaryButtonText: String,
});

const emit = defineEmits(['close', 'primaryAction', 'secondaryAction']);

const closeModal = () => {
    emit('close');
};

const primaryAction = () => {
    emit('primaryAction');
};

const secondaryAction = () => {
    emit('secondaryAction');
};
</script>
