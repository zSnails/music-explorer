<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { onBeforeMount } from 'vue';

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

async function getToken(code: string): Promise<string> {
    let codeVerifier = useStorage("code_verifier", "");
    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: config.public.CLIENT_ID,
            grant_type: "authorization_code",
            code,
            redirect_uri: config.public.CALLBACK_URL,
            code_verifier: codeVerifier.value,
        }),
    };

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    return response.access_token;
}

onBeforeMount(async () => {
    const token = await getToken(route.query.code as string);
    localStorage.setItem("access_token", token);
    router.push('/');
});

</script>
