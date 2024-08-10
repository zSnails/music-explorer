<script setup lang="ts">
import { setData, getData } from 'nuxt-storage/local-storage';

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
async function getToken(code: string): Promise<void> {
    let codeVerifier = getData("code_verifier", false) as string;
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
            code_verifier: codeVerifier,
        }),
    };

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    setData("access_token", response.access_token, 3600, 's');
}

await getToken(route.query.code as string);
router.push('/');
</script>
