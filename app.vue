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
        <footer>
            <h1>Footer</h1>
        </footer>
    </div>
</template>
<script setup lang="ts">
import { useStore } from './store/store';

const store = useStore();
let isLogged = computed(() => !!store.user);

const items = [
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
];

const right = [
    {
        label: 'Login',
        icon: 'i-heroicons-user',
        to: '/login'
    }
];
</script>
