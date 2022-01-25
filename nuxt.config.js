// Add to link when favico is ready to go
  // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nues with Vue',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Andru' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'keywords', content: 'HTML, CSS, JavaScript, Vue, Nuxt' },
      { hid: 'description', name: 'description', content: 'News available from every source, all in one place.' },
    ],
    link: [
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Epilogue'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald'},
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/global.scss',
    `~/assets/MainArticles.scss`,
    `~/assets/Article.scss`,
    `~/assets/Search.scss`
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [ ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: 'http://localhost:8000'
  //   }
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: 'http://localhost:8000'
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: [
    { path: "/server", handler: "~/server/server.js" },
  ],
}
