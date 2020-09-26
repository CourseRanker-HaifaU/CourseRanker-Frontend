<template>
  <div>
    <div class="flex flex-col gap-y-10 mt-4 min-w-full items-stretch">
      <h1 class="text-3xl font-bold ml-6">פרופ' אורן וימן</h1>
      <div style="margin-bottom: 18px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
      </div>
      <h1 class="text-xl font-bold">
        <u>קורסים שהועברו על ידי המרצה:</u>
      </h1>
      <courses-table
        :which-table="'myCourses'"
        :is-lecturer="isLecturer"
        :is-assist="!isLecturer"
      ></courses-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLecturer: {
      /* if it's a lecturer page -> isLecturer == true
         if it's a teaching assistant -> isLecturer == false  */
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped>
div span {
  @apply mr-2;
}
</style>
