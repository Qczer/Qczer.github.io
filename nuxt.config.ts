// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: "Mateusz Kuczera",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxtjs/i18n"],
  css: ["~/assets/css/tailwind.css"],
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.ts", name: "English" },
      { code: "pl", iso: "pl-PL", file: "pl.ts", name: "Polski" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    langDir: "locales",
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "en",
    },
    compilation: {
      strictMessage: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
