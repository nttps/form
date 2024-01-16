const isDev = process.env.NODE_ENV === "development";

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = process.env.NUXT_PUBLIC_API_URL;
const version = process.env.NUXT_PUBLIC_VERSION;
const assetsDir = process.env.NUXT_BUILD_ASSETSDIR;



// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: "page", mode: "out-in" },
    },
    vite: {
        build: {
            assetsDir
        }
    },
    buildDir: assetsDir,
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/google-fonts",
        "@vueuse/nuxt",
        "nuxt-icon",
        [
            "@pinia/nuxt",
            {
                autoImports: ["defineStore", "acceptHMRUpdate"],
            },
        ],
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxt/ui",
    ],
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
        "@/assets/css/main.scss",
    ],
    colorMode: {
        preference: "light",
    },
    imports: {
        dirs: ["stores"],
    },
    runtimeConfig: {
        public: {
            cookieLifetime: 7,
            version: version,
            apiUrl: apiBaseUrl,
            baseFileUrl: "",
            authUrl: "",
        },
    },
    routeRules: {
        // Render these routes on the client (SPA)
        "/**": { ssr: false },
        "/forms/**/public": { ssr: true },
    },
    vite: {
        build: {
            chunkSizeWarningLimit: 2000,
        },
    },
});
