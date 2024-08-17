import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event) => {
    const id = getRouterParam(event, "id");
    const api = serverApi(event);
    const data = await api(`/artists/${id}`);
    return Promise.resolve(data);
});
