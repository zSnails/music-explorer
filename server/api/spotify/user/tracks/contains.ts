import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event): Promise<boolean[]> => {
    const api = serverApi(event);
    const query = getQuery(event);
    const data = await api<boolean[]>('/me/tracks/contains', {
        method: 'GET',
        query: query
    });

    return Promise.resolve(data);
});
