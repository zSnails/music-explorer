import { H3Event } from "h3";
import { ofetch } from "ofetch";

export const serverApi = (event: H3Event) => {
    const accessToken = getCookie(event, "Access-Token");
    return ofetch.create({
        baseURL: 'https://api.spotify.com/v1',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}
