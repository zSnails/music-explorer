<template>
    <div class="grid gap-8 min-h-[100dvh] grid-rows-[auto_1fr_auto]">
        <header>
            <nav class="flex py-3 px-5 flex-row w-full h-fit justify-between bg-slate-100 shadow">
                <div>
                    <ULink class="text-xl" to="/">Music Explorer</ULink>
                </div>
                <div class="flex flex-row">
                    <ULink to="/music">Music</ULink>
                </div>
                <div>
                    <UButton v-if="!isLogged" to="/login">Login</UButton>
                </div>
            </nav>
        </header>
        <main class="mx-auto">
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
</script>
