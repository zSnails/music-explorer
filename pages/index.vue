<template>
    <section class="flex flex-col gap-5 min-w-[1008px] w-full">
        <div class="flex flex-col items-baseline">
            <UInput class="w-full" size="xl" icon="i-heroicons-magnifying-glass-20-solid" v-model="search"
                :loading="loading" @change="debouncedSearch" placeholder="Enter a name..."
                :ui="{ icon: { trailing: { pointer: '' } } }">
                <template #trailing>
                    <UButton v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                        :padded="false" @click="search = ''" />
                </template>
            </UInput>
            <UAccordion variant="link" class="flex-1" :items="[
                {
                    label: 'Filters',
                    icon: 'i-heroicons-adjustments-horizontal',
                    defaultOpen: false,
                    slot: 'filters'
                }
            ]">
                <template #filters>
                    <div class="flex flex-row gap-2">
                        <UInput @change="debouncedSearch" v-model="artist" placeholder="Artist..."></UInput>
                        <UInput @change="debouncedSearch" v-model="album" placeholder="Album..."></UInput>
                    </div>
                </template>
            </UAccordion>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <ClientOnly fallback-tag="span" fallback="Loading songs...">
                <UCard v-for="(track, idx) in tracks?.items" :key="idx" as="a" target="_blank"
                    :href="track.external_urls.spotify"
                    class="shadow-xl hover:scale-105 hover:bg-slate-100 hover:animate-pulse min-w-[500px] max-w-[500px] h-fit max-h-[220px] min-h-[220px] w-full flex flex-col gap-6">
                    <div class="flex flex-row justify-between">
                        <img :src="track.album.images[0]?.url" :alt="track.album.name" width="100"
                            class="mb-2 rounded-xl">
                        <h1>{{ format(track.duration_ms, 'mm:ss') }}</h1>
                    </div>
                    <div class="flex flex-row justify-between items-baseline truncate text-ellipsis">
                        <div class="flex flex-col">
                            <h1 class="font-bold text-4xl">{{ track.name }}</h1>
                            <div class="flex flex-row gap-2 overflow-hidden">
                                <h1 v-for="(artist, idx) in track.artists" :key="idx">
                                    <ULink :to="artist.external_urls.spotify">{{ artist.name }}</ULink>
                                </h1>
                            </div>
                        </div>
                        <UIcon class="w-8 h-8" name="i-heroicons-arrow-top-right-on-square-20-solid"></UIcon>
                    </div>
                </UCard>
            </ClientOnly>
        </div>
        <UButton v-if="tracks.items.length > 0 && next !== ''" :disabled="loading" @click="loadMore"
            class="w-fit mx-auto">Load
            more
        </UButton>
    </section>
</template>
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { format } from 'date-fns';

const { query: query, fullPath: fullPath } = useRoute();
const { push } = useRouter();

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
    next: string;
};

interface Response {
    tracks: Tracks;
};

const search = ref<string>(decodeURIComponent(query.query as string || ""));
const album = ref<string>(decodeURIComponent(query.album as string || ""));
const artist = ref<string>(decodeURIComponent(query.artist as string || ""));
const loading = ref<boolean>(false);

const debouncedSearch = useDebounceFn(async () => {
    let data = [search.value];
    interface Search {
        query?: string;
        album?: string;
        artist?: string;
    }

    let q: Search = {};
    if (search.value !== "") {
        q.query = search.value;
    }

    if (album.value !== "") {
        data.push(`album:"${album.value}"`);
        q.album = album.value;
    }

    if (artist.value !== "") {
        data.push(`artist:"${artist.value}"`);
        q.artist = artist.value;
    }

    const query = data.filter((val) => val !== "").join(" ");
    if (query !== "") {
        push({
            path: fullPath,
            query: q as any,
        });
        loading.value = true;
        const found = await loadTracks(query);
        tracks.value = found;
        loading.value = false;
    }
}, 500);

if (query.q !== "") {
    debouncedSearch();
}

const next = ref<string>("");
const tracks = ref<Tracks>({ items: [], next: next.value });

async function loadMore() {
    loading.value = true;
    const newTracks = await loadNext(next.value);
    tracks.value.items.push(...newTracks.items);
    loading.value = false;
}

async function loadTracks(query: string): Promise<Tracks> {
    const response = await $fetch<Response>("https://api.spotify.com/v1/search", {
        method: "GET",
        query: {
            q: query,
            type: "track",
            limit: 10,
            offset: 0,
        },
    });
    next.value = response.tracks.next;
    return response.tracks
}

async function loadNext(nextUrl: string): Promise<Tracks> {
    const response = await $fetch<Response>(nextUrl, {
        method: "GET",
    });
    next.value = response.tracks.next;
    return response.tracks;
}
</script>
