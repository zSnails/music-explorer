import { useStore } from "~/store/store";

export default defineNuxtPlugin(async () => {
    const store = useStore();
    if (store.user !== null) {
        const { genres } = await $fetch<{ genres: string[] }>('/api/spotify/genres');
        store.genres = genres;
    }
});
