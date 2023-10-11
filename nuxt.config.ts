// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
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
            apiUrl: "",
        },
    },
    routeRules: {
        // Render these routes on the client (SPA)
        "/**": { ssr: true },
        "/lists/**": { ssr: false },
        "/create/**": { ssr: false },
        "/settings/**": { ssr: false },
    },
});
