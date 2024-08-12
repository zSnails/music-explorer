<template>
    <section class="flex flex-col gap-5 w-full p-4">
        <div class="flex flex-row gap-4 items-center">
            <img :src="album?.images[0]?.url" :alt="album?.name" class="rounded-xl w-48 h-48" />
            <div class="flex flex-col">
                <h1 class="font-bold text-4xl">{{ album?.name }}</h1>
                <h2 class="text-lg">{{ album?.release_date }}</h2>
                <h3 class="text-md">Tracks: {{ album?.total_tracks }}</h3>
            </div>
        </div>
        <div class="mt-6">
            <h2 class="font-bold text-2xl mb-4">Tracklist</h2>
            <ul class="flex flex-col gap-2">
                <UCard v-for="(track, idx) in album?.tracks.items" :key="idx" as="a" target="_blank" 
                    :href="track.external_urls.spotify" :ui="cardConfig"
                    class="shadow-xl min-h-[108px] hover:scale-105 hover:bg-slate-100 hover:animate-pulse w-full h-fit flex flex-row gap-6">
                    <div class="flex flex-row w-full h-full justify-between">
                        <div class="flex flex-row gap-5">
                            <img :src="album?.images[0]?.url" :alt="track.name" width="50"
                                class="mb-2 rounded-lg">
                            <div class="flex flex-col gap-2">
                                <h1 class="font-bold text-xl">{{ track.track_number }}. {{ track.name }}</h1>
                                <h1 class="font-bold text-md">{{ formatDuration(track.duration_ms) }}</h1>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <UBadge color="primary" v-if="track.explicit">E</UBadge>
                        </div>
                    </div>
                </UCard>
            </ul>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const albumId = route.params.id;
const album = ref<Album | null>(null);
const cardConfig = { body: { base: '', background: '', padding: 'px-4 py-5 sm:p-6 w-full' } };

interface Album {
    name: string;
    release_date: string;
    total_tracks: number;
    images: { url: string }[];
    tracks: {
        items: Track[];
    };
}

interface Track {
    name: string;
    track_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
        spotify: string;
    };
}

async function loadAlbumInfo() {
    const response = await $fetch<Album>(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'GET',
    });
    album.value = response;
}

function formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

loadAlbumInfo();
</script>
