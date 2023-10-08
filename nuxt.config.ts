// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: false,
    modules: ["@nuxtjs/google-fonts", "@vueuse/nuxt", "nuxt-icon", "@nuxt/ui"],
    googleFonts: {
        display: "swap",
        prefetch: true,
        preconnect: true,
        families: {
            Kanit: true,
        },
    },
    css: [
        // CSS file in the project
        "@/assets/css/main.css",
    ],
    colorMode: {
        preference: "light",
    },
    runtimeConfig: {
        public: {
            version: "",
        },
    },
});
