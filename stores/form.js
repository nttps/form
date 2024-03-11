export const useFormStore = defineStore("form-questionaire", {
    state: () => ({
        duplicate: null,
    }),
    actions: {
        async assign(data) {
            data.survey_id = "";
            data.status = "ปิด";

            this.duplicate = data
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
