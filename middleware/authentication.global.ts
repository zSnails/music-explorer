import { useStore } from "~/store/store";
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useStore();
    if (to.path.startsWith('/api/auth')) return;
    const localeRoute = useLocaleRoute();
    if (user.getUser() === null && to.path !== localeRoute('/')?.path && to.path !== localeRoute('/login')?.path) {
        return navigateTo(localeRoute('/'));
    }
})
