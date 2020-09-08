<template>
  <div class="top-bar">
    <div class="bar-block">
      <nuxt-link to="/" class="h-full inline-flex">
        <img
          class="h-full rounded-full"
          src="~/assets/images/logoranker.png"
          alt="לוגו ועד הסטודנטים"
        />
        <div
          class="mr-6 flex flex-col justify-center items-center tracking-wider"
        >
          <span>ועד הסטודנטים</span>
          <span>בחוג למדעי המחשב</span>
        </div>
      </nuxt-link>
    </div>
    <div class="bar-block">
      <nuxt-link to="/login" class="login-btn">התחברות</nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.top-bar {
  @apply flex;
  @apply h-20;
  @apply bg-primary;
  @apply px-6;
  @apply py-2;
  @apply items-center;
  @apply justify-between;
  @apply text-blue-100;
  @apply border-accent;
  @apply border-b-4;
}

.login-btn {
  @apply bg-accent;
  @apply border;
  @apply border-solid;
  @apply border-accent-border;
  @apply shadow-lg;
  @apply rounded-lg;
  @apply text-white;
  @apply py-2;
  @apply px-4;
}

.login-btn:hover {
  @apply bg-accent-hover;
  @apply transition-colors;
  @apply ease-in;
  @apply duration-200;
}

.bar-block {
  @apply h-full;
  @apply inline-flex;
  @apply items-center;
}
</style>
