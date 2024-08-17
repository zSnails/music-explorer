import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const query = getQuery(event);
    const api = serverApi(event);
    const data = await api("/search", {
        method: 'GET',
        query
    });
    return Promise.resolve(data);
});
