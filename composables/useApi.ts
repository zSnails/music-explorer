import { ofetch } from "ofetch";

export const useApi = () => {
    const accessToken = useCookie("Access-Token");
    return ofetch.create({
        baseURL: 'https://api.spotify.com/v1',
        headers: {
            'Authorization': `Bearer ${accessToken.value}`
        }
    });
}
