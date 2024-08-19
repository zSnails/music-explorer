<script setup lang="ts">
const cardConfig = { body: { base: '', background: '', padding: 'px-4 py-5 sm:p-6 w-full' } };
const { url, image, name, rank } = defineProps<{
    url: string,
    image?: string,
    name: string,
    rank: number,
}>();
</script>

<template>
    <UCard as="a" target="_blank" :href="url" :ui="cardConfig"
        class="shadow-xl min-h-[108px] max-h-[108px] hover:scale-105 hover:bg-slate-100 hover:animate-pulse w-full h-fit flex flex-row gap-6">
        <div class="flex flex-row w-full h-full justify-between">
            <div class="flex flex-row gap-5">
                <img :src="image" :alt="name" width="50" class="mb-2 rounded-lg">
                <div class="flex flex-col gap-2 justify-center">
                    <h1 class="font-bold text-xl">{{ name }}</h1>
                </div>
            </div>
            <div class="flex items-center">
                <span></span>
            </div>
        </div>
    </UCard>
</template>
