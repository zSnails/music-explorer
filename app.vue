<template>
    <div class="grid gap-8 min-h-[100dvh] grid-rows-[auto_1fr_auto]">
        <header class="sticky top-0 z-50">
            <nav class="flex px-5 flex-row justify-between items-center bg-slate-100 h-fit min-h-[56px] shadow">
                <UHorizontalNavigation class="w-fit" :links="left" />
                <ClientOnly>
                    <UHorizontalNavigation class="w-fit" v-if="!isLogged" :links="right" />
                    <UDropdown :items="items" v-else>
                        <div class="flex flex-row items-center gap-2">
                            {{ store.getUser().display_name }}
                            <UAvatar :src="store.getUser().images[0]?.url">
                            </UAvatar>
                        </div>
                    </UDropdown>
                </ClientOnly>
            </nav>
        </header>
        <main class="mx-auto">
            <NuxtLoadingIndicator></NuxtLoadingIndicator>
            <NuxtPage />
        </main>
        <footer class="w-full min-h-[100px] flex flex-row bg-slate-100 shadow-[0_1px_3px_2px_rgba(0,0,0,0.2)]">
            <section class="flex flex-col items-start mx-auto m-5">
                <div>
                    <h1 class="font-bold text-2xl">Developers</h1>
                </div>
                <div class="w-fit flex flex-row gap-4">
                    <Author name="Aaron González" github="https://github.com/zSnails"
                        linked="https://www.linkedin.com/in/aaron-gonz%C3%A1lez-araya-2b48b223a" />

                    <Author name="Anthony Jiménez" github="https://github.com/AntJimeneZ" />

                    <Author name="Daniel Porras" github="https://github.com/zSnails"
                        linked="https://www.linkedin.com/in/aaron-gonz%C3%A1lez-araya-2b48b223a" />
                </div>
            </section>
        </footer>
    </div>
</template>
<script setup lang="ts">
import { useStore } from '~/store/store';
import Author from "~/components/Author.vue"

const store = useStore();
let isLogged = computed(() => !!store.user);

const items = [
    [{
        label: 'Profile',
        icon: 'i-heroicons-user',
        to: '/me'
    }],
    [{
        label: 'Logout',
        icon: 'i-heroicons-arrow-right-start-on-rectangle',
        to: '/logout'
    }],
];

const left = [
    {
        label: 'Music Explorer',
        icon: 'i-heroicons-musical-note',
        to: '/'
    },
    {
        label: 'Artists',
        icon: 'i-heroicons-user-group',
        to: '/artists'
    },
    {
        label: 'Trending',
        icon: 'i-heroicons-arrow-trending-up',
        to: '/trending'
    },
];

const right = [
    {
        label: 'Login',
        icon: 'i-heroicons-user',
        to: '/login'
    }
];
</script>
