export default defineNuxtRouteMiddleware((_to, from) => {

    if (process.server) return;
    const { $pinia } = useNuxtApp();
    const authStore = useAuthStore($pinia);
// Accessing getters and state
    const { isLoggedIn } = storeToRefs(authStore);
    if (!isLoggedIn.value) {

        console.log('t');
        return navigateTo({ name: "login" });
    }
});
