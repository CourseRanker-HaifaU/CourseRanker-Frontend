<template>
  <div class="flex flex-col items-center min-h-full justify-center">
    <img
      src="@/assets/images/lost_illustration.svg"
      alt="אדם הולך לאיבוד בדרך - אילוסטרציה"
      class="mt-4 h-64"
    />
    <h1 class="text-4xl">{{ title }}</h1>
    <p class="my-4">{{ message }}</p>
    <nuxt-link to="/" class="button blue-button min-w-0 w-auto">
      חזרה לחוף מבטחים
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'אופס! נתקלנו בשגיאה',
    },
    message: {
      type: String,
      required: true,
    },
  },
}
</script>
