<template>
    <UButton to="/login">Login</UButton>
    <p>{{ token }}</p>
</template>
<script setup lang="ts">
import { getData } from "nuxt-storage/local-storage";

const token = getData("access_token", true);
console.log(token);
</script>
