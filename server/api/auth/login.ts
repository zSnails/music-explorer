import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const config = useRuntimeConfig();
    const params: Record<string, string> = {
        response_type: 'code',
        client_id: config.public.CLIENT_ID || "",
        redirect_uri: config.public.CALLBACK_URL || ""
    };

    authUrl.search = new URLSearchParams(params).toString();
    await sendRedirect(event, authUrl.toString(), 301);
});
