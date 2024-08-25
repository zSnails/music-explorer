import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event) => {
    const api = serverApi(event);
    const data = await api('/me/tracks', {
        method: 'GET',
        query: {
            limit: 10,
            offset: 0,
        }
    });
    return Promise.resolve(data);
});
