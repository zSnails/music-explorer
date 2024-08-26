import { H3Event } from "h3";
import { serverApi } from "~/client/client";
import { Root } from "~/albums";


export default defineEventHandler(async (event: H3Event) => {
    const api = serverApi(event);
    const id = getRouterParam(event, "id");
    const data = await api<Root>(`/albums/${id}`);

    const ids = data.tracks?.items?.map((item) => item.id).join(",");
    console.log(ids);
    if (ids) {
        const valid = await api<boolean[]>('/me/tracks/contains', {
            method: 'GET',
            query: {
                ids
            }
        });

        for (const element in data?.tracks?.items) {
            data.tracks.items[element].saved = valid[element];
        }
    }
    return Promise.resolve(data);
});
