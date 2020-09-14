<template>
  <div class="flex flex-col almost-full-height">
    <header>
      <top-bar></top-bar>
    </header>
    <main
      class="flex flex-col items-center lg:mx-32 xl:mx-64 bg-white px-3 md:px-6 py-2 flex-grow shadow-2xl"
    >
      <Nuxt class="flex flex-col items-center w-full min-w-full" />
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.almost-full-height {
  height: 100vh;
}
</style>
