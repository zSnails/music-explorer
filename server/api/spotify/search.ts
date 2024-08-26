import { H3Event } from "h3";
import { serverApi } from "~/client/client";
import { Root } from "~/search";

export default defineEventHandler(async (event: H3Event): Promise<Root> => {
    const query = getQuery(event);
    const api = serverApi(event);
    const data = await api<Root>("/search", {
        method: 'GET',
        query
    });

    const ids = data.tracks?.items?.map((item) => item.id).join(",");
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
