import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    deleteCookie(event, "Access-Token");
    deleteCookie(event, "Refresh-Token");
    sendRedirect(event, "/");
});
