<template>
  <div class="admin-page-title min-w-full my-4">
    <div class="flex flex-row items-baseline">
      <nuxt-link
        v-if="backButton"
        to="/admin"
        class="text-primary"
        aria-label="חזרה למסך הניהול הראשי"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right']" size="2x" />
      </nuxt-link>
      <nuxt-link
        v-if="courseId != ''"
        :to="`/course/${courseId}`"
        class="text-primary"
        aria-label="חזרה לקורס"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right']" size="2x" />
      </nuxt-link>
      <h1
        class="text-primary text-4xl"
        :class="{ 'mr-4': backButton || courseId != '' }"
      >
        {{ title }}
      </h1>
    </div>
    <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
  </div>
</template>

<script>
export default {
  name: 'PanelPageTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
    backButton: {
      type: Boolean,
      default: false,
    },
    courseId: {
      type: String,
      default: '',
    },
  },
}
</script>
