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
    htmlAttrs: {
      dir: 'rtl',
    },
    title: 'משוב קורסים',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700;900&display=swap',
      },
    ],
    bodyAttrs: {
      class: ['bg-secondary', 'text-dark', 'min-h-screen'],
    },
  },
  /*
   ** Global CSS
   */
  css: [
    'vue-multiselect/dist/vue-multiselect.min.css',
    '@/assets/css/custom_dropdown.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/vuelidate', '~/plugins/infinite_loading'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/apollo',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    analyze: !!process.env.BUILD_ANALYZE,
  },
  fontawesome: {
    icons: {
      solid: [
        'faStar',
        'faStarHalfAlt',
        'faAlignLeft',
        'faTimesCircle',
        'faPlus',
        'faMinus',
        'faBars',
        'faExclamationTriangle',
        'faArrowRight',
        'faAngleUp',
      ],
      regular: ['faStar'],
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HTTP_ENDPOINT
          ? process.env.HTTP_ENDPOINT
          : 'http://localhost:8000/graphql/',
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
          },
          query: {
            fetchPolicy: 'no-cache',
          },
          $query: {
            fetchPolicy: 'no-cache',
          },
        },
        persisting: false,
      },
    },
    authenticationType: 'JWT',
  },
}
