<script setup lang="ts">
import type { Track } from '~/track';
import { format } from 'date-fns';

const cardConfig = { body: { base: '', background: '', padding: 'px-4 py-5 sm:p-6 w-full' } };
const { url } = defineProps<{
    url: string,
    image?: string,
    name: string,
    duration_ms: number,
    explicit: boolean,
}>();
</script>
<template>
    <UCard as="a" target="_blank" :href="url" :ui="cardConfig"
        class="shadow-xl min-h-[108px] hover:scale-105 hover:bg-slate-100 hover:animate-pulse w-full h-fit flex flex-row gap-6">
        <div class="flex flex-row w-full h-full justify-between">
            <div class="flex flex-row gap-5">
                <img :src="image" :alt="name" width="50" class="mb-2 rounded-lg">
                <div class="flex flex-col gap-2">
                    <h1 class="font-bold text-xl">{{ name }}</h1>
                    <h1 class="font-bold text-md">{{ format(duration_ms, 'mm:ss') }}</h1>
                </div>
            </div>
            <div class="flex items-center">
                <UBadge color="primary" v-if="explicit">E</UBadge>
            </div>
        </div>
    </UCard>
</template>
