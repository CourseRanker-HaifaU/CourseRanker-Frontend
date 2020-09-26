<template>
  <transition name="show-and-hide">
    <button
      v-if="scrolledDown"
      class="button blue-button shadow-lg rounded-full fixed p-6 bottom-0 left-0 mb-4 ml-4 h-16 w-16 md:h-20 md:w-20 flex flex-col items-center justify-center text-sm md:text-base"
      :class="additionalClasses"
      @click="scrollUp"
    >
      <font-awesome-icon :icon="['fas', 'angle-up']" size="2x" />
      למעלה
    </button>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    additionalClasses: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      scrolledDown: 'scrolling/scrolled',
    }),
  },
  methods: {
    scrollUp() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style scoped>
.show-and-hide-enter-active,
.show-and-hide-leave-active {
  @apply transition-opacity;
  @apply duration-200;
  @apply ease-in;
}

.show-and-hide-enter,
.show-and-hide-leave-to {
  @apply opacity-0;
}
</style>
