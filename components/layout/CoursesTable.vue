<template>
  <div
    class="frame-div flex items-stretch flex-shrink sm:text-sm md:text-base w-full"
  >
    <table class="lg:w-full">
      <tr class="text-right bg-primary text-white">
        <th class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">שם הקורס</th>
        <th class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">סימסטר</th>
        <th class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">נקודות זכות</th>
        <th class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">סוג קורס</th>
        <th class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">תיאור</th>
      </tr>

      <tr
        v-for="course in courses"
        :key="course.id"
        class="cursor-pointer items_row"
        @click="sendTo(`/course/${course.id}`)"
      >
        <td class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">
          {{ course.name }}
        </td>
        <td class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">
          {{ course.semester }}
        </td>
        <td class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">
          {{ course.points }}
        </td>
        <td class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">
          {{ course.isCompulsory ? 'חובה' : 'בחירה' }}
        </td>
        <td class="border px-8 py-4 mx-0 md:mx-2 lg:mx-4">
          {{ course.description }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        {
          id: 1,
          name: 'מבוא למדעי המחשב',
          semester: 'א׳',
          points: 5,
          isCompulsory: true,
          description: 'סילבוס',
        },
        {
          id: 2,
          name: 'מתמטיקה דיסקרטית',
          semester: 'א׳',
          points: 5,
          isCompulsory: true,
          description: 'סילבוס',
        },
        {
          id: 3,
          name: 'חדו״א א׳',
          semester: 'א׳',
          points: 5,
          isCompulsory: true,
          description: 'סילבוס',
        },
        {
          id: 4,
          name: 'מבוא להכנת ביסקוויטים',
          semester: 'א׳',
          points: 2,
          isCompulsory: false,
          description: 'סילבוס',
        },
      ],
    }
  },
  methods: {
    sendTo(msg) {
      this.$router.push(msg)
    },
  },
}
</script>

<style scoped>
.items_row {
  @apply transition-all;
  @apply duration-200;
  @apply ease-in;
  @apply bg-dark;
  @apply p-4;
  @apply bg-secondary;
}
.items_row:hover {
  @apply bg-secondary-hover;
}
</style>
