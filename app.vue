<template>
    <div class="grid gap-8 min-h-[100dvh] grid-rows-[auto_1fr_auto]">
        <header class="sticky top-0 z-50">
            <nav class="flex px-5 flex-row justify-between items-center bg-slate-100 h-fit min-h-[56px] shadow">
                <UHorizontalNavigation class="w-fit" :links="left">
                    <template #default="{ link }">
                        <span class="group-hover:text-primary relative">{{ $t(link.label) }}</span>
                    </template>
                </UHorizontalNavigation>
                <UHorizontalNavigation class="w-fit" v-if="!isLogged" :links="right">
                    <template #default="{ link }">
                        <span class="group-hover:text-primary relative">{{ $t(link.label) }}</span>
                    </template>
                </UHorizontalNavigation>
                <UDropdown :items="items" v-else>
                    <div class="flex flex-row items-center gap-2">
                        {{ store.getUser().display_name }}
                        <UAvatar :src="store.getUser().images[0]?.url">
                        </UAvatar>
                    </div>
                    <template #item="{ item }">
                        <UIcon :name="item.icon" />
                        {{ $t(item.label) }}
                    </template>
                </UDropdown>
            </nav>
        </header>
        <main class="mx-auto">
            <NuxtLoadingIndicator></NuxtLoadingIndicator>
            <NuxtPage />
        </main>
        <footer
            class="w-full min-h-[100px] flex flex-row justify-around bg-slate-100 shadow-[0_1px_3px_2px_rgba(0,0,0,0.2)]">
            <section class="flex flex-col items-start my-5">
                <div>
                    <h1 class="font-bold text-2xl">{{ $t('developers') }}</h1>
                </div>
                <div class="w-fit flex flex-row gap-4">
                    <Author name="Aaron González" github="https://github.com/zSnails"
                        linked="https://www.linkedin.com/in/aaron-gonz%C3%A1lez-araya-2b48b223a" />

                    <Author name="Anthony Jiménez" github="https://github.com/AntJimeneZ" />

                    <Author name="Daniel Porras" github="https://github.com/zSnails"
                        linked="https://www.linkedin.com/in/aaron-gonz%C3%A1lez-araya-2b48b223a" />
                </div>
            </section>
            <section class="flex flex-col items-start my-5">
                <h1 class="font-bold text-2xl">{{ $t('easter-egg') }}</h1>
                <ULink variant="link" @click="setWaterfall()">{{ $t('waterfall') }}</ULink>
            </section>
            <section class="flex flex-col items-start my-5">
                <h1 class="font-bold text-2xl">{{ $t('language') }}</h1>
                <ULink :to="switchLocalePath('es')">{{ $t('spanish') }}</ULink>
                <ULink :to="switchLocalePath('en')">{{ $t('english') }}</ULink>
                <ULink :to="switchLocalePath('jp')">{{ $t('japanese') }}</ULink>
            </section>
        </footer>
    </div>
</template>
<script setup lang="ts">
import { useStore } from '~/store/store';
import Author from "~/components/Author.vue"

const switchLocalePath = useSwitchLocalePath();
const store = useStore();
let isLogged = computed(() => !!store.user);

const localePath = useLocalePath();
const { push } = useRouter();

const items = [
    [{
        label: 'profile',
        icon: 'i-heroicons-user',
        click: () => push({ path: localePath('/me') }),
    }],
    [{
        label: 'logout',
        icon: 'i-heroicons-arrow-right-start-on-rectangle',
        click: () => push({ path: localePath('/logout') }),
    }],
];


const left = [
    {
        label: 'Music Explorer',
        icon: 'i-heroicons-musical-note',
        click: () => push({ path: localePath('/') }),
    },
    {
        label: 'artists',
        icon: 'i-heroicons-user-group',
        click: () => push({ path: localePath('/artists') }),
    },
    {
        label: 'trending',
        icon: 'i-heroicons-arrow-trending-up',
        click: () => push({ path: localePath('/trending') }),
    },
];

const right = [
    {
        label: 'login',
        icon: 'i-heroicons-user',
        click: () => push({ path: localePath('/login') }),
    }
];

function setWaterfall() {
    const element = document.querySelector('body');
    if (element) {
        element.style.setProperty('background-image', "url('/_nuxt/public/assets/img/background.jpg')");
        element.style.setProperty('background-size', "cover");
    }
}

</script>
