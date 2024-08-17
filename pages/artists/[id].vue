<script lang="ts" setup>
import type { Track, Album, Image } from "~/track";
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import SongCard from "~/components/SongCard.vue";

const route = useRoute();
const tracks = ref<Track[]>();
const albums = ref<Album[]>([]);
const artist = ref<ResponseArtist>();

interface ResponseSongs {
    tracks: Track[];
}

interface ResponseArtist {
    name: string;
    images: Image[];
    followers: Followers;
};

interface ResponseAlbums {
    items: Album[];
};

interface Followers {
    href: null;
    total: number;
};

async function loadTracks(): Promise<void> {
    const response = await $fetch<ResponseSongs>(`/api/spotify/artists/${route.params.id}/top-tracks`, {
        method: "GET",
    });

    tracks.value = response.tracks;
}

async function loadArtist(): Promise<void> {
    const response = await $fetch<ResponseArtist>(`/api/spotify/artists/${route.params.id}`, {
        method: "GET",
    });

    artist.value = response;
}

const loadAlbums = async () => {
    const response = await $fetch<ResponseAlbums>(`/api/spotify/artists/${route.params.id}/albums`, {
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
            <div class="flex lg:flex-row flex-col gap-4 items-center justify-between w-full">
                <div class="flex flex-row gap-2 items-center">
                    <UAvatar size="3xl" :src="artist?.images[0]?.url"></UAvatar>
                    <h1 class="text-8xl font-bold mb-4">{{ artist?.name }}</h1>
                </div>
                <h1 class="text-6xl font-bold font-sans">{{ new Intl.NumberFormat("en-US", {
                    notation:
                        "compact"
                }).format(artist?.followers.total || 0) }} Followers</h1>
            </div>
        </div>
        <div class="flex gap-5 lg:flex-row m-5 flex-col justify-between items-start">
            <div class="min-w-fit w-full">
                <h1 class="text-xl font-bold mb-2">Top Tracks</h1>
                <div class="flex flex-col gap-2">
                    <SongCard v-for="(track, idx) in tracks" :key="idx" :url="track.external_urls.spotify"
                        :name="track.name" :duration_ms="track.duration_ms" :image="track.album?.images[0]?.url"
                        :explicit="track.explicit" />
                </div>
            </div>
            <div class="min-w-fit w-full">
                <h1 class="text-xl font-bold mb-2">Albums</h1>
                <div class="flex flex-col gap-2">
                    <UCard v-for="(album, idx) in albums.filter(a => a.total_tracks > 1).slice(0, 10)" :key="idx" as="a"
                        target="" :ui="cardConfig" :href="`/albums/${album.id}`"
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
                                <UBadge color="sky">{{ album.total_tracks }} Tracks</UBadge>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>
    </div>
</template>
