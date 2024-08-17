import { H3Event, getQuery } from "h3";

interface AuthResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
};

export default defineEventHandler(async (event: H3Event) => {
    const config = useRuntimeConfig();
    const query = getQuery<{ code?: string, error?: string }>(event);

    if (query.code) {
        const buf = Buffer.from(config.public.CLIENT_ID + ':' + config.CLIENT_SECRET).toString('base64');
        const body = await $fetch<AuthResponse>('https://accounts.spotify.com/api/token', {
            method: 'POST',
            query: {
                grant_type: "authorization_code",
                code: query.code,
                redirect_uri: config.public.CALLBACK_URL
            },
            headers: {
                'Authorization': `Basic ${buf}`,
                'Content-Type': "application/x-www-form-urlencoded"
            }
        });

        setCookie(event, "Access-Token", body.access_token, {
            maxAge: body.expires_in,
            httpOnly: true,
        });
        setCookie(event, "Refresh-Token", body.refresh_token, {
            httpOnly: true
        });
        sendRedirect(event, '/', 301);
    }

    sendRedirect(event, '/', 301);
});
