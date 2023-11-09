import VueHtmlToPaper from "vue-html-to-paper";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueHtmlToPaper);
});
