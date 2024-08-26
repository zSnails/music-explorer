import { H3Event } from "h3";
import { serverApi } from "~/client/client";
import { Root } from "~/top-tracks";

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const api = serverApi(event);
    const id = getRouterParam(event, "id", { decode: true });
    const data = await api<Root>(`/artists/${id}/top-tracks`);
    return Promise.resolve(data);
});
