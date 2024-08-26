<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import SongCard from "~/components/SongCard.vue";
import type { Root as ArtistsRoot } from "~/artists";
import type { Root as TopTracksRoot } from "~/top-tracks";
import type { Root as ArtistsAlbumsRoot } from "~/artists-albums";

const route = useRoute();
const tracks = ref<TopTracksRoot>({} as TopTracksRoot);
const albums = ref<ArtistsAlbumsRoot>({} as ArtistsAlbumsRoot);
const artist = ref<ArtistsRoot>();
const isFollowing = ref(false);

const tr = await useFetch<TopTracksRoot>(`/api/spotify/artists/${route.params.id}/top-tracks`, {
    method: "GET",
});

tracks.value = tr.data?.value || {} as TopTracksRoot;

const art = await useFetch<ArtistsRoot>(`/api/spotify/artists/${route.params.id}`, {
    method: "GET",
});

artist.value = art.data.value || {} as ArtistsRoot;

const al = await useFetch<ArtistsAlbumsRoot>(`/api/spotify/artists/${route.params.id}/albums`, {
    method: "GET",
});
albums.value = al.data?.value || {} as ArtistsAlbumsRoot;


const fo = await useFetch<boolean[]>(`/api/spotify/isFollowing/${route.params.id}`, {
    method: "GET",
});

if (fo.data.value) {
    isFollowing.value = fo?.data?.value[0];
}

async function followArtist(): Promise<void> {
    try {
        const response = await $fetch(`/api/spotify/follow/${route.params.id}`, {
            method: "PUT",
        });
        if (response.success) {
            isFollowing.value = true;
        } else {
        }
    } catch (error) {
        console.error('Error following the artist:', error);
    }
}

async function unfollowArtist(): Promise<void> {
    try {
        const response = await $fetch(`/api/spotify/unFollow/${route.params.id}`, {
            method: "DELETE",
        });
        if (response.success) {
            isFollowing.value = false;
        } else {
        }
    } catch (error) {
        console.error('Error unfollowing the artist:', error);
    }
}

const cardConfig = { body: { base: '', background: '', padding: 'px-4 py-5 sm:p-6 w-full' } };
const localePath = useLocalePath();

</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex justify-between">
            <div class="flex lg:flex-row flex-col gap-4 items-center justify-between w-full">
                <div class="flex flex-row gap-2 items-center">
                    <UAvatar size="3xl" :src="artist?.images[0]?.url"></UAvatar>
                    <h1 class="text-8xl font-bold mb-4">{{ artist?.name }}</h1>
                </div>
                <div class="flex flex-col items-end">
                    <h1 class="text-6xl font-bold font-sans">
                        {{ new Intl.NumberFormat("en-US", { notation: "compact" }).format(artist?.followers.total || 0)
                        }} {{ $t('followers') }}
                    </h1>
                    <UButton v-if="isFollowing" size="xl" color="red" @click="unfollowArtist()">{{ $t('unfollow') }}
                    </UButton>
                    <UButton v-else size="xl" @click="followArtist()">{{ $t('follow') }}</UButton>
                </div>
            </div>
        </div>
        <div class="flex gap-5 lg:flex-row m-5 flex-col justify-between items-start">
            <div class="min-w-fit w-full">
                <h1 class="text-xl font-bold mb-2">{{ $t('top-tracks') }}</h1>
                <div class="flex flex-col gap-2">
                    <SongCard v-for="(track, idx) in tracks.tracks" :key="idx" :url="track.external_urls.spotify"
                        :id="track.id" :name="track.name" :duration_ms="track.duration_ms"
                        :image="track.album?.images[0]?.url" :explicit="track.explicit" />
                </div>
            </div>
            <div class="min-w-fit w-full">
                <h1 class="text-xl font-bold mb-2">{{ $t('albums') }}</h1>
                <div class="flex flex-col gap-2">
                    <UCard v-for="(album, idx) in albums.items.filter(a => a.total_tracks > 1).slice(0, 10)" :key="idx"
                        as="a" target="" :ui="cardConfig" :href="localePath(`/albums/${album.id}`)"
                        class="shadow-xl min-h-[108px] max-h-[108px] hover:scale-105 hover:bg-slate-100 hover:animate-pulse w-full h-fit flex flex-row gap-6">
                        <div class="flex flex-row w-full h-full justify-between">
                            <div class="flex flex-row gap-5">
                                <img :src="album.images[0]?.url" :alt="album.name" width="50" class="mb-2 rounded-lg">
                                <div class="flex flex-col gap-2">
                                    <h1 class="font-bold text-xl">{{ album.name }}</h1>
                                    <h1 class="font-bold text-md">{{ album.release_date }}</h1>
                                </div>

                            </div>
                            <div class="flex flex-col justify-between items-end">
                                <div class="flex flex-row justify-between items-baseline truncate text-ellipsis">
                                    <UIcon class="w-4 h-4" name="i-heroicons-arrow-top-right-on-square-20-solid">
                                    </UIcon>
                                </div>
                                <UBadge color="sky">{{ album.total_tracks }} {{ $t('tracks') }}</UBadge>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>
    </div>
</template>
