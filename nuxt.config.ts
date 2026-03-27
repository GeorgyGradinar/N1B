// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'ru', files: ['ru/general.json', 'ru/sites-landing.json', 'ru/sites-corporate.json', 'ru/sites-webapp.json', 'ru/sites-redesign.json', 'ru/sites-speed.json', 'ru/apps-mobile.json', 'ru/apps-support.json'], name: 'RU' },
      { code: 'en', files: ['en/general.json', 'en/sites-landing.json', 'en/sites-corporate.json', 'en/sites-webapp.json', 'en/sites-redesign.json', 'en/sites-speed.json', 'en/apps-mobile.json', 'en/apps-support.json'], name: 'EN' },
      { code: 'ka', files: ['ka/general.json', 'ka/sites-landing.json', 'ka/sites-corporate.json', 'ka/sites-webapp.json', 'ka/sites-redesign.json', 'ka/sites-speed.json', 'ka/apps-mobile.json', 'ka/apps-support.json'], name: 'KA' }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix',
    lazy: true,
    detectBrowserLanguage: false
  },
  app: {
    head: {
      title: 'N1B - IT-решения',
      meta: [
        { name: 'description', content: 'N1B - разработка и поддержка IT-продуктов: веб, мобильные приложения, облака, DevOps. Более 3 лет на рынке.' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
