<template>
    <section class="flex flex-row gap-10 w-full p-4">
        <div class="min-w-fit w-full">
            <h2 class="font-bold text-3xl text-center mb-4">Trending Songs</h2>
            <ul class="flex flex-col gap-4">
                <SongCard v-for="(item, idx) in playlist?.tracks?.items" :key="idx" :id="item.track.id"
                    :name="`${item.track.name} - ${item.track.artists[0]?.name}`" :artist="item.track.artists[0]?.name"
                    :url="item.track.external_urls.spotify" :image="item.track.album.images[0]?.url"
                    :duration_ms="item.track.duration_ms" :favorite="false" :explicit="item.track.explicit" />
            </ul>
        </div>

        <div class="min-w-fit w-full">
            <h2 class="font-bold text-3xl text-center mb-4">Trending Artists</h2>
            <ul class="flex flex-col gap-4">
                <ArtistCard v-for="(artist, idx) in artistMap" :key="idx" :name="artist.name" :image="artist.image"
                    :url="artist.spotifyUrl" />
            </ul>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SongCard from '~/components/SongCard.vue';
import ArtistCard from '~/components/ArtistCard.vue';
import { type Root } from '~/playlist';

const playlistId = '37i9dQZF1DXcBWIGoYBM5M'; // ID de la playlist
const playlist = ref<Root>({} as Root);

interface Artist {
    name: string;
    spotifyUrl: string;
    image: string;
}

const response = await useFetch<Root>(`/api/spotify/trending/${playlistId}`, {
    method: 'GET',
});

playlist.value = response.data.value || {} as Root;

const artistMap: Record<string, Artist> = {};

playlist.value?.tracks?.items.forEach(item => {
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

</script>
