import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event) => {
    const api = serverApi(event);
    const id = getRouterParam(event, "id");
    const data = await api(`/me/following/contains?type=artist&ids=${id}`);
    return Promise.resolve(data);
});
