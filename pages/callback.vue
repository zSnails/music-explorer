<script setup lang="ts">
import type { CookieOptions } from '#app';
import { useStorage } from '@vueuse/core';

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

const accessToken = useCookie("access_token", { maxAge: 3600, sameSite: 'lax' });
const token = await getToken(route.query.code as string);
accessToken.value = token;
refreshCookie("access_token");
router.push('/');

</script>
