<template>
  <div
    class="flex h-20 bg-primary px-6 py-2 items-center justify-between text-blue-100 border-accent border-b-4"
  >
    <div class="bar-block">
      <nuxt-link to="/" class="h-full inline-flex">
        <img
          class="h-full rounded-full"
          src="~/assets/images/logoranker.png"
          alt="לוגו ועד הסטודנטים"
        />
        <div class="mr-6 flex flex-col justify-center items-center">
          <span>ועד הסטודנטים</span>
          <span>בחוג למדעי המחשב</span>
        </div>
      </nuxt-link>
    </div>
    <div class="bar-block">
      <nuxt-link
        to="/login"
        class="login-btn search-btn text-white py-2 px-4 rounded-lg"
      >
        התחברות
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.login-btn {
  background-color: #d51111;
  border: 1px solid #9d0d0d;
}

.login-btn:hover {
  background-color: #bc0f0f;
  transition: background-color 0.2s ease-in;
}

.bar-block {
  @apply h-full;
  @apply inline-flex;
  @apply items-center;
}
</style>
