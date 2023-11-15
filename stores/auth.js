

export const useAuthStore = defineStore("user", {
    state: () => ({
        user: {},
    }),

    getters: {
        isLoggedIn: (state) => !!state.user,
        username: (state) => state.user?.currentUser || "",
        fullName: (state) => state.user?.currentUserInfo?.fullName || "",
    },
    actions: {
        async login(loginForm) {
            const config = useRuntimeConfig();

            const baseUrl = `${config.public.apiUrl}/api/AppsLogin/LoginMini`;

            const lifetime = 60 * 60 * 24 * config.public.cookieLifetime;

            console.log(lifetime);

            await $fetch(`${baseUrl}`, {
                method: "POST",
                body: loginForm,
            })
                .then((response) => {
                    /* Update Pinia state */
                    if (response.loginResult == "fail")
                        throw response.loginResultInfo;

                    this.user = response;

                    const newCookie = useCookie("user", {
                        maxAge: lifetime,
                        sameSite: true,
                        secure: true,
                    });

                    
                    newCookie.value = this.user;
                })
                .catch((error) => {
                    throw error;
                });
        },
        logout() {
            const user = useCookie("user");
            user.value = null;
        },
        fetchUser() {
            return this.user;
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
