import { useAuthStore } from "~/stores/auth";


export default defineNuxtRouteMiddleware((_to, from) => {
    const { isLoggedIn } = useAuthStore();


    console.log(isLoggedIn);
    if (!isLoggedIn) {
        return navigateTo({ name: "login" });
    }
});
