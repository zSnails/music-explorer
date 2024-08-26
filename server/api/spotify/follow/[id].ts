import { H3Event } from "h3";
import { serverApi } from "~/client/client";

export default defineEventHandler(async (event: H3Event) => {
    const api = serverApi(event);
    const id = getRouterParam(event, "id");

    try {
        await api(`/me/following?type=artist&ids=${id}`, {
            method: "PUT",
        });
        return { success: true, message: "Artist followed successfully" };
    } catch (error) {
        console.error('Error following the artist:', error);
        return { success: false, message: "Failed to follow the artist" };
    }
});
