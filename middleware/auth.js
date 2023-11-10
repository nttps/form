


export default defineNuxtRouteMiddleware((_to, from) => {

    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
        return navigateTo({ name: "login" });
    }
});
