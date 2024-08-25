<script setup lang="ts">
import { format } from 'date-fns';

const cardConfig = { body: { base: '', background: '', padding: 'px-4 py-5 sm:p-6 w-full' } };
let { id, favorite } = defineProps<{
    favorite?: boolean,
    url: string,
    image?: string,
    name: string,
    duration_ms: number,
    explicit: boolean,
    id: string,
}>();

const fav = ref<boolean>(favorite);

const unfavorite = async () => {
    await $fetch('/api/spotify/user/tracks', {
        method: 'DELETE',
        body: {
            ids: [id]
        }
    });
    fav.value = false;
};

const addFavorite = async () => {
    await $fetch('/api/spotify/user/tracks', {
        method: 'PUT',
        body: {
            ids: [id]
        }
    });
    fav.value = true;
};

</script>
<template>
    <UCard target="_blank" :href="url" :ui="cardConfig"
        class="group shadow-xl min-h-[108px] hover:scale-105 hover:bg-slate-100 hover:animate-pulse w-full h-fit flex flex-row gap-6">
        <div class="flex flex-row w-full h-full justify-between">
            <div class="flex flex-row gap-5">
                <img :src="image" :alt="name" width="50" class="mb-2 rounded-lg">
                <div class="flex flex-col gap-2">
                    <h1 class="font-bold text-xl">
                        <ULink :to="url">{{ name }}</ULink>
                    </h1>
                    <h1 class="font-bold text-md">{{ format(duration_ms, 'mm:ss') }}</h1>
                </div>
            </div>
            <div class="flex flex-col items-center justify-between">
                <UBadge color="primary" v-if="explicit">E</UBadge>
                <UButton class="hidden group-hover:inline-flex" v-if="fav" icon="i-heroicons-bookmark-slash-solid"
                    variant="ghost" @click="unfavorite()" />
                <UButton class="hidden group-hover:inline-flex" v-else icon="i-heroicons-bookmark" variant="ghost"
                    @click="addFavorite()" />
            </div>
        </div>
    </UCard>
</template>
