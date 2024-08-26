import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event): Promise<void> => {
    const api = serverApi(event);
    const body = await readBody(event);
    const data = await api('/me/tracks', {
        method: 'DELETE',
        body: body
    });

    return Promise.resolve(data);
});