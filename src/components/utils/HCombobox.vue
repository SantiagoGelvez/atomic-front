<template>
    <div class="w-full border-2 rounded-lg">
        <Combobox v-model="selected">
            <div class="relative mt-1">
                <div class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <ComboboxInput class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0" :displayValue="(item) => (item as Item)[valueText] || 'Encuentra tu empresa...'" @change="query = $event.target.value"/>
                        
                    <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </ComboboxButton>
                </div>
                
                <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" @after-leave="query = ''" >
                    <ComboboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" >

                        <div v-if="filteredItems.length === 0 && query !== ''" class="relative cursor-default select-none px-4 py-2 text-gray-700" >
                            No hay coincidencias
                        </div>

                        <ComboboxOption v-for="item in filteredItems" as="template" :key="item[valueItem]" :value="item" v-slot="{ selected, active }">
                            <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{ 'bg-purple-600 text-white': active, 'text-gray-900': !active, }">
                                <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                                    {{ item[valueText] }}
                                </span>
                                
                                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3" :class="{ 'text-white': active, 'text-teal-600': !active }">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ComboboxOption>
                    </ComboboxOptions>
                </TransitionRoot>
            </div>
        </Combobox>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { all } from 'node_modules/axios/index.cjs';

interface Item {
    [key: string]: any;
}

const emit = defineEmits<{
    (e: 'onValueSelected', value: Item): void;
}>()

const props = defineProps<{
    items: Item[];
    valueItem?: string;
    valueText?: string;
    fixedOption?: Item;
}>()

const valueItem = computed(() => props.valueItem || 'id');
const valueText = computed(() => props.valueText || 'name');

const allItems = computed<Item[]>(() => {
    return props.fixedOption ? [props.fixedOption, ...props.items] : props.items
})

const query = ref('')

const selected = ref(allItems.value[0])

const filteredItems = computed<Item[]>(() => {
    return allItems.value.filter((item) => item[valueText.value].toLowerCase().includes(query.value.toLowerCase()))
})

watch(selected, (newValue) => {
    emit('onValueSelected', newValue)
})
</script>
