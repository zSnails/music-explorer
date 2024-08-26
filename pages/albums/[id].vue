<template>
    <section class="flex flex-col gap-5 w-full p-4">
        <div class="flex flex-row gap-4 items-center">
            <img :src="album?.images[0]?.url" :alt="album?.name" class="rounded-xl w-48 h-48" />
            <div class="flex flex-col">
                <h1 class="font-bold text-4xl">{{ album?.name }}</h1>
                <h2 class="text-lg">{{ album?.release_date }}</h2>
                <h3 class="text-md">{{ album?.total_tracks }} {{ $t('tracks') }}</h3>
            </div>
        </div>
        <div class="mt-6">
            <h2 class="font-bold text-2xl mb-4">{{ $t('tracklist') }}</h2>
            <ul class="flex flex-col gap-2">
                <SongCard v-for="(track, idx) in album?.tracks.items" :key="idx" :url="track.external_urls.spotify"
                    :image="album?.images[0]?.url" :id="track.id" :name="track.name" :duration_ms="track.duration_ms"
                    :favorite="track.saved" :explicit="track.explicit" />
            </ul>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import SongCard from '~/components/SongCard.vue';
import type { Root } from '~/albums';

const route = useRoute();
const albumId = route.params.id;
const album = ref<Root>({} as Root);

const response = await useFetch<Root>(`/api/spotify/albums/${albumId}`, {
    method: 'GET',
});
album.value = response.data.value || {} as Root;

</script>
