import type en from './locales/en'

export type TranslationType = typeof en

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    availableLocales: ['en', 'pl'],
    globalInjection: true,
    warnHtmlMessage: false
  }
})
