<template>
  <div class="flex flex-col almost-full-height">
    <header>
      <top-bar></top-bar>
    </header>
    <main
      class="flex flex-col items-center lg:mx-20 bg-white px-6 py-2 flex-grow shadow-2xl"
    >
      <Nuxt class="flex flex-col items-center" />
    </main>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('auth/initStateFromCookies')
  },
}
</script>

<style scoped>
.almost-full-height {
  height: 100vh;
}
</style>
