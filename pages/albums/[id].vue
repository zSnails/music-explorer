<template>
  <section class="flex flex-col gap-5 min-w-[1008px] w-full">
    <div class="grid grid-cols-2 gap-2">
      <ClientOnly fallback-tag="span" fallback="Loading albums...">
        <UCard v-for="(album, idx) in albums?.items" :key="idx" as="a" target="" :href="`/albumInfo/${album.id}`"
          class="shadow-xl hover:scale-105 hover:bg-slate-100 hover:animate-pulse min-w-[500px] max-w-[500px] h-fit max-h-[200px] w-full flex flex-col gap-6 min-h-[220px]">
          <div class="flex flex-row justify-between">
            <img :src="album.images[0]?.url ?? 'https://store-images.s-microsoft.com/image/apps.10546.13571498826857201.6603a5e2-631f-4f29-9b08-f96589723808.dc893fe0-ecbc-4846-9ac6-b13886604095'" :alt="album.name" width="100" class="mb-2 rounded-xl">
            <h1>{{ new Intl.NumberFormat("en-US",{notation: "compact"}).format (album.total_tracks)+ " tracks"}}</h1> 
          </div>
          <div class="flex flex-row justify-between items-baseline truncate text-ellipsis">
            <div class="flex flex-col">
              <h1 class="font-bold text-4xl">{{ album.name }}</h1>
              <h1 class="font-bold text-2">{{ album.release_date }}</h1>
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
import { useStorage } from '@vueuse/core';
import { useRoute } from "vue-router";
const route = useRoute();
const artistId = route.params.id;
const token = useStorage("access_token", "");

const albums = ref<Albums>({ items: [] });

interface Albums {
  items: Album[];
}

interface ExternalUrls {
  spotify: string;
}

interface Album {
  name: string;
  total_tracks: number;
  images: Image[];
  external_urls: ExternalUrls;
  id: string;
  release_date: string
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Response {
  items: Album[];
}

async function loadAlbums(): Promise<Albums> {
  const response = await $fetch<Response>(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    method: "GET",
    query: {
      limit: 10,
      offset: 0,
    },
  });

  return { items: response.items };
}

loadAlbums().then(found => {
  albums.value = found;
});
</script>
