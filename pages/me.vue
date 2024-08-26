<template>
    <div class="flex flex-col gap-2">
        <section id="information" class="flex flex-row items-center gap-2">
            <img :src="user.images[0].url" class="rounded-full" alt="">
            <h1 class="font-bold text-3xl">{{ user.display_name }}</h1>
        </section>
        <section class="flex flex-col gap-5">
            <h2 class="font-bold text-8xl">{{ $t('favorite-tracks') }}</h2>
            <div class="flex flex-col gap-2 min-w-[500px]">
                <SongCard :key="idx" v-for="(song, idx) in favoriteSongs.data.value?.items" :id="song.track.id"
                    :url="song.track.external_urls.spotify" :image="song.track.album.images[0].url"
                    :name="song.track.name" :duration_ms="song.track.duration_ms" :explicit="song.track.explicit"
                    :favorite="true">
                </SongCard>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import SongCard from '~/components/SongCard.vue';
import type { Data } from '~/data';
import { useStore } from '~/store/store';

const store = useStore();
const user = store.getUser();

const favoriteSongs = await useFetch<Data>('/api/spotify/user/tracks', { method: 'GET' });
</script>
