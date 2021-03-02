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
    title: 'CS Ranker',
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
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700;900&display=swap',
      },
    ],
    bodyAttrs: {
      class: ['bg-secondary', 'text-dark', 'min-h-screen', 'flex', 'flex-col'],
    },
  },
  /*
   ** Global CSS
   */
  css: [
    'vue-multiselect/dist/vue-multiselect.min.css',
    '@/assets/css/custom_dropdown.css',
    '@/assets/css/full_height.css',
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
  components: [{ path: '~/components', pathPrefix: false }],
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
    'nuxt-compress',
    '@nuxtjs/netlify-files',
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
        'faThumbsUp',
        'faThumbsDown',
      ],
      regular: ['faStar', 'faThumbsUp', 'faThumbsDown'],
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
  'nuxt-compress': {
    gzip: {
      cache: false,
    },
    brotli: {
      threshold: 10240,
    },
  },
  generate: {
    fallback: true,
  },
}
