


export default defineNuxtRouteMiddleware((_to, from) => {

    const { $pinia } = useNuxtApp();

   
    const { isLoggedIn } = useAuthStore($pinia);

     console.log(isLoggedIn);

    if (!isLoggedIn) {
        return navigateTo({ name: "login" });
    }
});
