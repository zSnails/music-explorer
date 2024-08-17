import { useStore } from "~/store/store";
import type { User } from "~/user";

export default defineNuxtPlugin(async () => {
    const store = useStore();
    const api = useApi();

    try {
        const user = await api<User>('/me');
        if (user) {
            store.setUser(user);
        }
    } catch (err) {
        store.setUser(null);
        console.error(err);
    }
});
