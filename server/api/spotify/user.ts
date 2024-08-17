import { H3Event } from "h3";
import { serverApi } from "~/client/client";
import { User } from "~/user";

export default defineEventHandler(async (event: H3Event) => {
    const api = serverApi(event);
    const data = await api<User>('/me');
    return Promise.resolve(data);
});
