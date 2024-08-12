<script lang="ts" setup>

import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { format } from 'date-fns';
const route = useRoute();

const tracks = ref<Song[]>();
const albums = ref<Album[]>([]);
const artist = ref<ResponseArtist>();
const followers = ref(0);

interface Image {
    url: string;
    height: number;
    width: number;
}

interface Song {
    name: string;
    album: Album;
    duration_ms: number;
    explicit: boolean;
    release_date: string;
    external_urls: ExternalUrls;
}

interface ResponseSongs {
    tracks: Song[];
}

interface ResponseArtist {
    name: string;
    images: Image[];
    followers: Followers;
};

interface ResponseAlbums {
    items: Album[];
};

interface Album {
    name: string;
    release_date: string;
    images: Image[];
    total_tracks: number;
    external_urls: ExternalUrls;
};

interface Followers {
    href: null;
    total: number;
};

interface ExternalUrls {
    spotify: string;
};

async function loadTracks(): Promise<void> {
    const response = await $fetch<ResponseSongs>(`https://api.spotify.com/v1/artists/${route.params.id}/top-tracks`, {
        method: "GET",
    });

    tracks.value = response.tracks;
}

async function loadArtist(): Promise<void> {
    const response = await $fetch<ResponseArtist>(`https://api.spotify.com/v1/artists/${route.params.id}`, {
        method: "GET",
    });

    artist.value = response;
    followers.value = response.followers.total;
}

const loadAlbums = async () => {
    const response = await $fetch<ResponseAlbums>(`https://api.spotify.com/v1/artists/${route.params.id}/albums`, {
        method: "GET",
    });
    albums.value = response.items;
}

onBeforeMount(async () => {
    loadTracks();
    loadArtist();
    loadAlbums();
});

const cardConfig = { body: { base: '', background: '', padding: 'px-4 py-5 sm:p-6 w-full' } };

</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex justify-between">
            <div class="flex flex-row gap-4 items-center justify-between w-full">
                <div class="flex flex-row gap-2 items-center">
                    <UAvatar size="3xl" :src="artist?.images[0]?.url"></UAvatar>
                    <h1 class="text-8xl font-bold mb-4">{{ artist?.name }}</h1>
                </div>
                <h1 class="text-6xl font-bold font-sans">{{ new Intl.NumberFormat("en-US", {
                    notation:
                        "compact"
                }).format(followers) }} Followers</h1>
            </div>
        </div>
        <div class="flex justify-between items-start">
            <div class="pr-8 min-w-[500px]">
                <h1 class="text-xl font-bold mb-2">Top Tracks</h1>
                <div class="flex flex-col gap-2">
                    <UCard v-for="(song, idx) in tracks" :key="idx" as="a" target="_blank" :ui="cardConfig"
                        :href="song.external_urls.spotify"
                        class="shadow-xl min-h-[108px] hover:scale-105 hover:bg-slate-100 hover:animate-pulse w-full h-fit flex flex-row gap-6">
                        <div class="flex flex-row w-full h-full justify-between">
                            <div class="flex flex-row gap-5">
                                <img :src="song.album.images[0]?.url" :alt="song.name" width="50"
                                    class="mb-2 rounded-lg">
                                <div class="flex flex-col gap-2">
                                    <h1 class="font-bold text-xl">{{ song.name }}</h1>
                                    <h1 class="font-bold text-md">{{ format(song.duration_ms, 'mm:ss') }}</h1>
                                </div>

                            </div>
                            <div class="flex flex-col justify-between items-end">
                                <div class="flex flex-row justify-between items-baseline truncate text-ellipsis">
                                    <UIcon class="w-4 h-4" name="i-heroicons-arrow-top-right-on-square-20-solid">
                                    </UIcon>
                                </div>
                                <UBadge color="primary" v-if="song.explicit">E</UBadge>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
            <div class="pl-2 min-w-[500px]">
                <h1 class="text-xl font-bold mb-2">Albums</h1>
                <div class="flex flex-col gap-2">
                    <UCard v-for="(album, idx) in albums.filter(a => a.total_tracks > 1).slice(0, 10)" :key="idx" as="a"
                        target="_blank" :ui="cardConfig" :href="album.external_urls.spotify"
                        class="shadow-xl min-h-[108px] max-h-[108px] hover:scale-105 hover:bg-slate-100 hover:animate-pulse w-full h-fit flex flex-row gap-6">
                        <div class="flex flex-row w-full h-full justify-between">
                            <div class="flex flex-row gap-5">
                                <img :src="album.images[0]?.url" :alt="album.name" width="50" class="mb-2 rounded-lg">
                                <div class="flex flex-col gap-2">
                                    <h1 class="font-bold text-xl">{{ album.name }}</h1>
                                    <h1 class="font-bold text-md">{{ album.release_date }}</h1>
                                </div>

                            </div>
                            <div class="flex flex-col justify-between items-end">
                                <div class="flex flex-row justify-between items-baseline truncate text-ellipsis">
                                    <UIcon class="w-4 h-4" name="i-heroicons-arrow-top-right-on-square-20-solid">
                                    </UIcon>
                                </div>
                                <UBadge color="sky">Tracks {{ album.total_tracks }}</UBadge>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>
    </div>
</template>
