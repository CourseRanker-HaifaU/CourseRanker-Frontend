export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    isSmall() {
      return this.windowWidth <= 640
    },
  },
  methods: {
    onWindowWidthChange() {
      this.windowWidth = window.innerWidth
    },
  },
  mounted() {
    window.addEventListener('resize', this.onWindowWidthChange)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowWidthChange)
  },
}
