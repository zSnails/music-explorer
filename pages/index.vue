<template>
    <section class="flex flex-col gap-5 min-w-[1008px] w-full">
        <div class="flex flex-col items-baseline">
            <UInput class="w-full" size="xl" icon="i-heroicons-magnifying-glass-20-solid" v-model="search"
                :loading="loading" @change="debouncedSearch" :placeholder="$t('prompt')"
                :ui="{ icon: { trailing: { pointer: '' } } }">
                <template #trailing>
                    <UButton v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                        :padded="false" @click="search = ''" />
                </template>
            </UInput>
            <UAccordion variant="link" class="flex-1" :items="[
                {
                    label: $t('filters'),
                    icon: 'i-heroicons-adjustments-horizontal',
                    defaultOpen: false,
                    slot: 'filters'
                }
            ]">
                <template #filters>
                    <div class="flex flex-row gap-2">
                        <UInput @change="debouncedSearch" v-model="artist" :placeholder="$t('artist')"></UInput>
                        <UInput @change="debouncedSearch" v-model="album" :placeholder="$t('album')"></UInput>
                        <USelectMenu @change="debouncedSearch" :placeholder="$t('genre')" class="min-w-[150px]"
                            v-model="genre" :options="store.genres">
                        <template #empty>
                            {{$t('empty-select')}}
                        </template>
                        </USelectMenu>
                    </div>
                </template>
            </UAccordion>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <ClientOnly fallback-tag="span" :fallback="$t('loading-songs')">
                <SongCard v-for="(track, idx) in tracks.tracks.items" :key="idx" :favorite="track.saved" :id="track.id"
                    :url="track.external_urls.spotify" :image="track.album.images[0]?.url" :name="track.name"
                    :duration_ms="track.duration_ms" :explicit="track.explicit"></SongCard>
            </ClientOnly>
        </div>
        <UButton v-if="tracks.tracks.items.length > 0 && next !== ''" :disabled="loading" @click="loadMore"
            class="w-fit mx-auto">{{ $t('load-more') }}</UButton>
    </section>
</template>
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import SongCard from '~/components/SongCard.vue';
import { useStore } from '~/store/store';
import type { Root, Tracks } from '~/search';

const { query: query, fullPath: fullPath } = useRoute();
const { push } = useRouter();

const store = useStore();

const search = ref<string>(decodeURIComponent(query.query as string || ""));
const album = ref<string>(decodeURIComponent(query.album as string || ""));
const artist = ref<string>(decodeURIComponent(query.artist as string || ""));
const genre = ref<string>(decodeURIComponent(query.genre as string || ""));
const loading = ref<boolean>(false);

const debouncedSearch = useDebounceFn(async () => {
    let data = [search.value];
    interface Search {
        query?: string;
        album?: string;
        artist?: string;
        genre?: string;
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

    if (genre.value !== "") {
        data.push(`genre:"${genre.value}"`);
        q.genre = genre.value;
    }

    const query = data.filter((val) => val !== "").join(" ");

    push({
        path: fullPath,
        query: q as any,
    });

    if (query !== "") {
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

const tracks = ref<Root>({
    tracks: {
        items: [],
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0
    },
    artists: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    },
    albums: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    },
    playlists: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    },
    shows: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    },
    episodes: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    },
    audiobooks: {
        href: '',
        limit: 0,
        next: '',
        offset: 0,
        previous: '',
        total: 0,
        items: []
    }
});

async function loadMore() {
    loading.value = true;
    const newTracks = await loadNext(next.value);
    tracks.value.tracks.items.push(...newTracks.items);
    loading.value = false;
}

async function loadTracks(query: string): Promise<Root> {
    const response = await $fetch<Root>("/api/spotify/search", {
        method: "GET",
        query: {
            q: query,
            type: "track",
            limit: 10,
            offset: 0,
        },
    });
    next.value = response.tracks.next;
    return response
}

async function loadNext(url: string): Promise<Tracks> {
    const response = await $fetch<Root>('/api/spotify/next', {
        method: "GET",
        query: {
            url
        }
    });
    next.value = response.tracks.next;
    return response.tracks;
}

</script>
