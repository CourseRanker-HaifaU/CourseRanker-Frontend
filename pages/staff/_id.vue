<template>
  <div>
    <div class="mt-4 min-w-full">
      <h1 class="text-3xl font-bold mb-2 text-primary">פרופ' אורן וימן</h1>
      <section
        id="averageRatings"
        class="flex flex-col md:flex-row justify-start text-lg"
      >
        <article class="flex flex-row items-center md:ml-4">
          <span class="ml-2">דירוג ממוצע כמרצה:</span>
          <rating :rating="4"></rating>
        </article>
        <article class="flex lex-row items-center">
          <span class="ml-2">דירוג ממוצע כמתרגל/ת:</span>
          <rating :rating="4"></rating>
        </article>
      </section>
      <hr class="border-0 bg-gray-500 text-gray-500 h-px my-8" />
      <h2 class="text-xl font-bold">קורסים שהועברו על ידי חבר/ת הסגל:</h2>
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
