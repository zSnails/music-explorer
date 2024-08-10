<template>
    <section class="flex flex-row gap-2">
        <div id="search" class="flex flex-col">
            <UInput v-model="search" @change="debouncedSearch" placeholder="Enter a name..." />
            <USelect></USelect>
        </div>
        <div id="results">
            <div class="grid grid-cols-2 gap-2">
                <UCard v-for="(track, idx) in tracks?.items" :key="idx"
                    class="shadow-xl hover:bg-slate-200 hover:animate-pulse min-w-[500px] max-w-[500px] h-fit max-h-[200px] w-full flex flex-col gap-6">
                    <img :src="track.album.images[0].url" :alt="track.album.name" width="100" class="mb-2">
                    <div>
                        <h1 class="font-bold text-4xl text-ellipsis truncate">{{ track.name }}</h1>
                        <div class="flex flex-row gap-2 text-ellipsis truncate">
                            <h1 v-for="(artist, idx) in track.artists" :key="idx">
                                <ULink :to="artist.external_urls.spotify">{{ artist.name }}</ULink>
                            </h1>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useStorage, useDebounceFn } from '@vueuse/core';

interface ExternalUrls {
    spotify: string;
};

interface Artist {
    name: string;
    href: string;
    external_urls: ExternalUrls;
};

interface Song {
    name: string;
    artists: Artist[];
    duration_ms: number;
    external_urls: ExternalUrls;
    album: Album;
};

interface Image {
    height: number;
    url: string;
    width: number;
};

interface Album {
    images: Image[];
    name: string;
};

interface Tracks {
    items: Song[];
};

interface Response {
    tracks: Tracks;
};

const search = ref<string>("");
const tracks = ref<Tracks>({ items: [] });
const token = useStorage("access_token", "");

const debouncedSearch = useDebounceFn(async () => {
    const found = await loadTracks(search.value);
    tracks.value = found;
}, 1000);

async function loadTracks(query: string): Promise<Tracks> {
    const response = await $fetch<Response>("https://api.spotify.com/v1/search", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token.value}`
        },
        query: {
            q: query,
            type: "track",
            limit: 10,
            offset: 0,
        },
    });

    return response.tracks
}
</script>
