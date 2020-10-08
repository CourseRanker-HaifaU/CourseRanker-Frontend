<template>
  <div>
    <panel-page-title title="הקורסים שלי" />
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
