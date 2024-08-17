import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const api = serverApi(event);
    const data = await api('/recommendations/available-genre-seeds');
    return Promise.resolve(data);
});
