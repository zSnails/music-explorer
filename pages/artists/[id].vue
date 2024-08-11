<script lang="ts" setup>

import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStorage } from '@vueuse/core';
import { format } from 'date-fns';
const token = useStorage("access_token", "");
const route = useRoute();

const tracks = ref<Song[]>();
const albums = ref<Album[]>([]);
const artist = ref("");
const followers = ref(0);
const images = ref<string[]>([]);

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


const carouselRef = ref();

const loadTracks = async (): Promise<Tracks> => {
    const response = await $fetch<ResponseSongs>(`https://api.spotify.com/v1/artists/${route.params.id}/top-tracks`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token.value}`
        },

    });

    for (let i = 0; i < 10; i++) {
        var song: Song = {
            name: response.tracks[i].name,
            album: response.tracks[i].album,
            duration_ms: response.tracks[i].duration_ms,
            explicit: response.tracks[i].explicit,
            release_date: response.tracks[i].album.release_date,
            images: response.tracks[i].album.images,
        }
        if (song.explicit) {
            song.explicit = "Explicit";
        } else {
            song.explicit = "";
        }

       
        songs.value.push(song);

        

        const image = songs.value[i].images[0].url;
        images.value.push(image);

    }

    return tracks.value = response.tracks;
}

const loadArtist = async () => {
    const response = await $fetch<ResponseArtist>(`https://api.spotify.com/v1/artists/${route.params.id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token.value}`
        },

    });


    artist.value = response.name;
    followers.value = response.followers.total;
    //images.value = [response.images[0].url];

}

const loadAlbums = async () => {
    const response = await $fetch<ResponseAlbums>(`https://api.spotify.com/v1/artists/${route.params.id}/albums`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token.value}`
        },

    });

    console.log(response.items);

    for (let i = 0; i < 10; i++) {
        
        var album: Album = {
            name: response.items[i].name,
            release_date: response.items[i].release_date,
            images: response.items[i].images,
            total_tracks: response.items[i].total_tracks,
            external_urls: response.items[i].external_urls,
        }
        console.log(album.total_tracks);
        if (album.total_tracks > 1) {
            albums.value.push(album);
        }
    }

    console.log(albums.value);

}


onMounted(() => {

    loadTracks();
    loadArtist();
    loadAlbums();
    setInterval(() => {
        if (!carouselRef.value) return;

        if (carouselRef.value.page === carouselRef.value.pages) {
            return carouselRef.value.select(0);
        }

        carouselRef.value.next();
    }, 7000);
});


</script>

<template>
    <div>
        <div class="flex justify-between ">
            <div>
                <h1 class="text-xl font-bold mb-4">Artist: {{ artist }}</h1>
                <h1 class="text-xl font-bold font-sans">Followers: {{ new Intl.NumberFormat("en-US", { notation:
                    "compact" }).format(followers) }}</h1>
            </div>
            <div>
                <UCarousel ref="carouselRef" v-slot="{ item }" :items="images"
                    class="rounded-lg overflow-hidden w-32 h-32">
                    <img :src="item" class="w-32 h-32" draggable="false" />
                </UCarousel>
            </div>
        </div>
    </div>
    <div class="flex justify-between items-start ">
        <div class="pr-8">
            <h1 class="text-xl font-bold mb-8">Top Tracks</h1>
            <ClientOnly fallback-tag="span" fallback="Loading songs...">
                <UCard v-for="(song, idx) in songs" :key="idx" as="a" target="_blank" :href="songs[idx].album.external_urls.spotify"
                    class="shadow-xl hover:scale-105 hover:bg-slate-100 hover:animate-pulse min-w-[500px] max-w-[500px] h-fit max-h-[200px] w-full flex flex-col gap-6">
                    <div class="flex flex-row justify-between">
                        <img :src="song.images[0].url" :alt="song.name" width="100" class="mb-2 rounded-xl">
                        <h1 class="font-bold text-xl">{{ song.name }}</h1>
                        <h1 class="font-bold text-lg">{{ format(song.duration_ms, 'mm:ss') }}</h1>
                        <h1 class="font-bold text-green-500">{{ song.explicit }}</h1>
                    </div>
                    <div class="flex flex-row justify-between items-baseline truncate text-ellipsis">
                        <div class="flex flex-col">
                        </div>
                        <UIcon class="w-8 h-8" name="i-heroicons-arrow-top-right-on-square-20-solid"></UIcon>
                    </div>
                </UCard>
            </ClientOnly>
        </div>
        <div class=" pl-2">
            <h1 class="text-xl font-bold mb-8">Albums</h1>
            <ClientOnly fallback-tag="span" fallback="Loading songs...">
                <UCard v-for="(album, idx) in albums" :key="idx" as="a" target="_blank" :href="album.external_urls.spotify"
                    class="shadow-xl hover:scale-105 hover:bg-slate-100 hover:animate-pulse min-w-[500px] max-w-[500px] h-fit max-h-[200px] w-full flex flex-col gap-6">
                    <div class="flex flex-row justify-between">
                        <img :src="album.images[0].url" :alt="album.name" width="100" class="mb-2 rounded-xl">
                        <h1 class="font-bold text-4xl">{{ album.name }}</h1>
                        <h1 class="font-bold text-blue-500">tracks: {{ album.total_tracks }}</h1>
                    </div>
                    <div class="flex flex-row justify-between items-baseline truncate text-ellipsis">
                        <div class="flex flex-col">
                            <h1 class="font-bold text-2xl">{{ album.release_date }}</h1>
                        </div>
                        <UIcon class="w-8 h-8" name="i-heroicons-arrow-top-right-on-square-20-solid"></UIcon>
                    </div>
                </UCard>
            </ClientOnly>
        </div>
    </div>
</template>