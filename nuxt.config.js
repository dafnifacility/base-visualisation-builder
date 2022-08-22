// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/plotter/',
        },
      }
    : {}

export default {
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - DAFNI Plotter',
    title: 'DAFNI Plotter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          process.env.NODE_ENV === 'development'
            ? '/favicon.png'
            : './favicon.png',
      },
    ],
  },

  /**
   * Set up Environment variables
   * - Keycloak ones used in initial Selenium testing.
   */
  env: {
    keycloakUrl: process.env.KEYCLOAK_ENDPOINT_TEST,
    keycloakRealm: process.env.KEYCLOAK_REALM,
    keycloakClient: process.env.KEYCLOAK_CLIENT,
    INSTANCE_ID:
      process.env.INSTANCE_ID || '798c22e4-f74f-420c-bf25-39f2be32a9ac',
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#4E77A0' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/api/backends/index.js',
    '~/plugins/axios.js',
    { src: '~/plugins/keycloak.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
  ],

  //  Check for secure cookie on each route change
  router: {
    middleware: 'authenticated',
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: [
      '~/assets/style/scss/variables/_colours.scss',
      '~/assets/style/scss/variables/_radius.scss',
    ],
    optionsPath: '~/plugins/vuetify.js',
    // TODO: need to turn off tree shaking since draggable wraps v-expansion-panels
    // see https://github.com/nuxt-community/vuetify-module/issues/128
    treeShake: false,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCSS: process.env.NODE_ENV === 'development',
    publicPath: process.env.NODE_ENV === 'development' ? '/_nuxt' : './_nuxt/',
    extend(config) {
      // Run ESLint on save
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      })
    },
  },

  ...routerBase,
}
