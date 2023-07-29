// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // all routes will be background revalidated (ISR) at most every 60 seconds
    "/**": { isr: 60 },
  },
});
