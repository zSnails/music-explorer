// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ["@nuxt/ui"],

    runtimeConfig: {
        // Make environment variables accessible here
        public: {
            CLIENT_ID: process.env.CLIENT_ID,
            CALLBACK_URL: process.env.CALLBACK_URL,
            // Add more environment variables as needed
        }
    }
});
