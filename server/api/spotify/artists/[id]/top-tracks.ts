import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const api = serverApi(event);
    const id = getRouterParam(event, "id", { decode: true });
    const data = await api(`/artists/${id}/top-tracks`);
    return Promise.resolve(data);
});
