<template>
  <div>
    <panel-page-title title="הקורסים שלי"></panel-page-title>
    <courses-table
      :which-table="'myCourses'"
      :is-lecturer="false"
      :is-assist="false"
    ></courses-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showIndices: [
        {
          searchCourse: 0,
          isShown: false,
        },
        {
          myCoursesTable: 1,
          isShown: false,
        },
      ],
    }
  },
  methods: {
    toggleShown(index) {
      this.showIndices[index].isShown = !this.showIndices[index].isShown
    },
  },
}
</script>
