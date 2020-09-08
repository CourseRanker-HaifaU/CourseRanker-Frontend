<template>
  <div
    class="flex h-20 bg-primary px-6 py-2 items-center justify-between text-blue-100 border-accent border-b-4"
  >
    <div class="bar-block">
      <img
        class="h-full rounded-full"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <div class="mr-6 flex flex-col justify-center items-center font-bold">
        <span>ועד הסטודנטים</span>
        <span>בחוג למדעי המחשב</span>
      </div>
    </div>
    <div class="bar-block">
      <nuxt-link
        to="/login"
        class="bg-accent text-white p-2 rounded-lg font-bold shadow hover:bg-accent-hover"
      >
        התחברות
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.bar-block {
  @apply h-full;
  @apply inline-flex;
  @apply items-center;
}
</style>
