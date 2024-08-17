import { defineStore } from "pinia";
import type { User } from "~/user";

export const useStore = defineStore("app", {
    state: () => ({
        user: null as any
    }),
    actions: {
        setUser(user: User | null) {
            this.user = user;
        },
        getUser(): User {
            return this.user as User;
        }
    }
});
