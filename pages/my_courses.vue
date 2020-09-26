<template>
  <div>
    <h1 class="user-panel-header font-bold text-5xl">הקורסים שלי</h1>
    <h1></h1>
    <hr class="mb-6 w-full border-t-2 bg-blue-200" />
    <h1 class="user-panel-header text-3xl">חיפוש קורס חדש</h1>
    <search-bar class="label__search"></search-bar>
    <hr class="mb-6 w-full border-t-2 bg-blue-200" />
    <h1 class="user-panel-header text-3xl">טבלת הקורסים שלי</h1>
    <courses-table
      :which-table="'myCourses'"
      :is-lecturer="false"
      :is-assist="false"
    ></courses-table>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.user-panel-header {
  @apply w-full;
  @apply text-right;
  @apply text-primary;
}
</style>
