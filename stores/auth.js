// store/auth.ts
export const useAuthStore = defineStore("auth-store", {
    state: () => ({
        user: useCookie("user"),
    }),

    getters: {
        isLoggedIn: (state) => !!state.user,
        username: (state) => state.user.currentUser,
    },
    actions: {
        async login(loginForm) {
            const config = useRuntimeConfig();
            const baseUrl = `${config.public.apiUrl}/api/AppsLogin/LoginMini`;

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
                        maxAge: 60 * 24 * 28,
                        sameSite: true,
                        secure: true,
                    });
                    newCookie.value = this.user;
                    /* Store user in local storage to keep them logged in between page refreshes */
                    // localStorage.setItem("user", JSON.stringify(this.user));
                    // localStorage.setItem("token", JSON.stringify(this.token));
                    // localStorage.setItem(
                    //     "isLogin",
                    //     JSON.stringify(this.isLogin)
                    // );
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
