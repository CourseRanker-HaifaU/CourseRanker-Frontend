<template>
  <div class="flex-1 flex flex-col">
    <header>
      <top-bar></top-bar>
    </header>
    <main
      class="flex-1 flex flex-col items-center lg:mx-32 xl:mx-64 bg-white px-3 md:px-6 py-2 flex-grow shadow-2xl"
    >
      <Nuxt
        class="flex-1 flex flex-col items-center w-full min-w-full h-full"
      />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created() {
    this.restoreUserData()
  },
  beforeMount() {
    window.addEventListener('scroll', this.updateScrolled)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updateScrolled)
  },
  methods: {
    ...mapActions({
      restoreUserData: 'user_data/restoreState',
      updateScrolled: 'scrolling/changeScrolled',
    }),
  },
}
</script>
