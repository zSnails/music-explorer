import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const api = serverApi(event);
    const { url } = getQuery<{ url: string; }>(event);
    const data = await api(url);
    return Promise.resolve(data);
});
