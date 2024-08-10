<template></template>
<script setup lang="ts">

import { setData } from 'nuxt-storage/local-storage';

function generateRandomString(length: number): string {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

function sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
}

function base64Encode(input: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

const codeVerifier = generateRandomString(64);

const hashed = await sha256(codeVerifier);
const codeChallenge = base64Encode(hashed);

setData("code_verifier", codeVerifier);

const authUrl = new URL("https://accounts.spotify.com/authorize");

const config = useRuntimeConfig();

const params: Record<string, string> = {
    response_type: 'code',
    client_id: config.public.CLIENT_ID || "",

    scope: "",
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: config.public.CALLBACK_URL || ""
};

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();
</script>
