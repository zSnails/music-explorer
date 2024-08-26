import { H3Event } from "h3";
import { serverApi } from "~/client/client";
import { Root } from "~/playlist";


export default defineEventHandler(async (event: H3Event) => {
    const api = serverApi(event);
    const id = getRouterParam(event, "id");
    const data = await api<Root>(`/playlists/${id}`);
    return Promise.resolve(data);
});

//const data = await api(`/playlists/${id}/tracks`);
