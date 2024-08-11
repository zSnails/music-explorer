<template>
    <div class="grid gap-8 min-h-[100dvh] grid-rows-[auto_1fr_auto]">
        <header class="sticky top-0 z-50">
            <nav class="flex px-5 flex-row justify-between bg-slate-100 h-fit min-h-[56px] shadow">
                <UHorizontalNavigation class="w-fit" :links="left" />
                <ClientOnly>
                    <UHorizontalNavigation class="w-fit" v-if="!isLogged" :links="right" />
                </ClientOnly>
            </nav>
        </header>
        <main class="mx-auto">
            <NuxtLoadingIndicator></NuxtLoadingIndicator>
            <NuxtPage />
        </main>
        <footer>
            <h1>Footer</h1>
        </footer>
    </div>
</template>
<script setup lang="ts">
import { useStorage } from "@vueuse/core";
const token = useStorage("access_token", "");
const isLogged = computed(() => token.value !== "");

const left = [
    {
        label: 'Music Explorer',
        icon: 'i-heroicons-home',
        to: '/'
    },
    {
        label: 'Music',
        icon: 'i-heroicons-musical-note',
        to: '/music'
    },
    {
        label: 'Artists',
        icon: 'i-heroicons-user-group',
        to: '/artists'
    }, {
        label: 'Albums',
        icon: 'i-heroicons-view-columns',
        to: '/album'
    }
];

const right = [
    {
        label: 'Login',
        icon: 'i-heroicons-user',
        to: '/login'
    }
];
</script>
