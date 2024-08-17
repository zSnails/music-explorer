<template>
    <section class="flex flex-col gap-5 min-w-[1008px] w-full">
        <div class="flex flex-col items-baseline">
            <UInput class="w-full" size="xl" icon="i-heroicons-magnifying-glass-20-solid" v-model="search"
                @change="debouncedSearch" placeholder="Enter a name..." :ui="{ icon: { trailing: { pointer: '' } } }">
                <template #trailing>
                    <UButton v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                        :padded="false" @click="search = ''" />
                </template>
            </UInput>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <ClientOnly fallback-tag="span" fallback="Loading songs...">
                <UCard v-for="(artist, idx) in artists?.items" :key="idx" as="a" target=""
                    :href="`/artists/${artist.id}`"
                    class="shadow-xl hover:scale-105 hover:bg-slate-100 hover:animate-pulse min-w-[500px] max-w-[500px] h-fit max-h-[200px] w-full flex flex-col gap-6 min-h-[220px]">
                    <div class="flex flex-row justify-between">
                        <img :src="artist.images[0]?.url ?? 'https://store-images.s-microsoft.com/image/apps.10546.13571498826857201.6603a5e2-631f-4f29-9b08-f96589723808.dc893fe0-ecbc-4846-9ac6-b13886604095'"
                            :alt="artist.name" width="100" class="mb-2 rounded-xl">
                        <h1>{{ new Intl.NumberFormat("en-US", { notation: "compact" }).format(artist.followers.total) }}
                            followers </h1>
                    </div>
                    <div class="flex flex-row justify-between items-baseline truncate text-ellipsis">
                        <div class="flex flex-col">
                            <h1 class="font-bold text-4xl">{{ artist.name }}</h1>
                            <div class="flex flex-row gap-2 overflow-hidden">
                            </div>
                        </div>
                        <UIcon class="w-8 h-8" name="i-heroicons-arrow-top-right-on-square-20-solid"></UIcon>
                    </div>
                </UCard>
            </ClientOnly>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core';

const search = ref("");
const artists = ref<Artists>({ items: [] });

interface Artists {
    items: Artist[];
};

interface ExternalUrls {
    spotify: string;
};

interface Artist {
    name: string;
    followers: Followers;
    images: Image[];
    external_urls: ExternalUrls;
    id: string;
}

interface Followers {
    href: null;
    total: number;
}

interface Image {
    height: number;
    url: string;
    width: number;
};

interface Response {
    artists: Artists;
};

const debouncedSearch = useDebounceFn(async () => {
    const query = encodeURIComponent(search.value);
    if (query !== "") {
        const found = await loadTracks(query);
        artists.value = found;
    }
}, 1000);

async function loadTracks(query: string): Promise<Artists> {
    const response = await $fetch<Response>("/api/spotify/search", {
        method: "GET",
        query: {
            q: query,
            type: "artist",
            limit: 10,
            offset: 0,
        },
    });
    return response.artists
}
</script>
