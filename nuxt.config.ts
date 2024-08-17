// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@pinia/nuxt"],

    colorMode: {
        preference: 'light' // disable dark mode
    },

    runtimeConfig: {
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        public: {
            CLIENT_ID: process.env.CLIENT_ID,
            CALLBACK_URL: process.env.CALLBACK_URL,
        }
    },
});