<template>
  <section class="flex flex-row gap-10 w-full p-4">
    <div class="min-w-fit w-full">
      <h2 class="font-bold text-3xl text-center mb-4">Trending Songs</h2>
      <ul class="flex flex-col gap-4">
        <SongCard v-for="(track, idx) in playlist?.tracks.items" :key="idx"
          :name="`${track.track.name} - ${track.track.artists[0]?.name}`"
          :artist="track.track.artists[0]?.name"
          :url="track.track.external_urls.spotify"
          :image="track.track.album.images[0]?.url"
          :duration_ms="track.track.duration_ms"
          :explicit="track.track.explicit" />
      </ul>
    </div>

    <div class="min-w-fit w-full">
      <h2 class="font-bold text-3xl text-center mb-4">Trending Artists</h2>
      <ul class="flex flex-col gap-4">
        <ArtistCard v-for="(artist, idx) in trendingArtists" :key="idx"
          :name="artist.name"
          :image="artist.image"
          :url="artist.spotifyUrl" />
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SongCard from '~/components/SongCard.vue';
import ArtistCard from '~/components/ArtistCard.vue';

const playlistId = '37i9dQZF1DXcBWIGoYBM5M'; // ID de la playlist
const playlist = ref<Playlist | null>(null);
const trendingArtists = ref<Artist[]>([]);

interface Playlist {
  tracks: {
      items: {
          track: {
              name: string;
              artists: { name: string, external_urls: { spotify: string } }[];
              duration_ms: number;
              explicit: boolean;
              external_urls: {
                  spotify: string;
              };
              album: {
                  images: { url: string }[];
              };
          };
      }[];
  };
}

interface Artist {
  name: string;
  spotifyUrl: string;
  image: string;
}

async function loadPlaylistInfo() {
  const response = await $fetch<Playlist>(`/api/spotify/trending/${playlistId}`, {
      method: 'GET',
  });
  playlist.value = response;

  const artistMap: Record<string, Artist> = {};

  playlist.value?.tracks.items.forEach(item => {
    item.track.artists.forEach(artist => {
      if (!artistMap[artist.name]) {
        artistMap[artist.name] = {
          name: artist.name,
          spotifyUrl: artist.external_urls.spotify,
          image: item.track.album.images[0]?.url,
        };
      }
    });
  });

  trendingArtists.value = Object.values(artistMap);
}

loadPlaylistInfo();
</script>
