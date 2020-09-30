<template>
  <div>
    <h1 class="user-panel-header font-bold text-5xl">הקורסים שלי</h1>
    <hr class="mb-6 w-full border-t-2 bg-blue-200" />
    <h1 class="user-panel-header text-3xl">חיפוש קורס חדש</h1>
    <search-bar class="label__search"></search-bar>
    <hr class="mb-6 w-full border-t-2 bg-blue-200" />
    <h1 class="user-panel-header text-3xl">טבלת הקורסים שלי</h1>
    <courses-table
      which-table="myCourses"
      :course-list="courseList"
      :is-loading="$apollo.loading"
      :infinite-handler="infiniteHandler"
      @remove-row="removeRow"
    ></courses-table>
  </div>
</template>

<script>
import myCourses from '@/gql/myCourses.gql'
import { myCoursesDataTransform, mergeMyCoursesData } from '@/utils'
export default {
  data() {
    return {
      keywords: '',
      courseList: {
        dataArray: [],
      },
      rowsPerPage: 5,
    }
  },
  apollo: {
    courseList: {
      query: myCourses,
      update: (data) => myCoursesDataTransform(data),
      variables() {
        return {
          keywords: this.keywords,
          rowsPerPage: this.rowsPerPage,
          after: '',
        }
      },
      debounce: 300,
      throttle: 300,
      fetchPolicy: 'network-only',
    },
  },
  methods: {
    infiniteHandler($state) {
      if (!this.courseList.hasNextPage) {
        $state.complete()
      } else {
        const nextCursor = this.courseList.endCursor
        this.$apollo.queries.courseList
          .fetchMore({
            query: myCourses,
            variables: {
              keywords: this.keywords,
              rowsPerPage: this.rowsPerPage,
              after: nextCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const result = mergeMyCoursesData(previousResult, fetchMoreResult)
              return result
            },
          })
          .then(() => {
            $state.loaded()
          })
      }
    },
    removeRow(index) {
      this.courseList.dataArray.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.user-panel-header {
  @apply w-full;
  @apply text-right;
  @apply text-primary;
}
</style>
