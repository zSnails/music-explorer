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
        <li v-for="(track, idx) in album?.tracks.items" :key="idx" class="p-2 bg-green-500 text-black rounded-lg">
          <div class="flex justify-between">
            <span>{{ track.track_number }}. {{ track.name }}</span>
            <span>{{ formatDuration(track.duration_ms) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

const route = useRoute();
const albumId = route.params.id;
const token = useStorage('access_token', '');
const album = ref<Album | null>(null);

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
}

async function loadAlbumInfo() {
  const response = await $fetch<Album>(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
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

<style scoped>
</style>
