<template>
  <div class="container">
    <welcome-message></welcome-message>
    <search-bar class="label__search"></search-bar>
    <br />
    <courses-table
      :which-table="'courses'"
      :is-lecturer="false"
      :is-assist="false"
      :keywords="keywords"
      :course-list="courseList"
      :infinite-handler="infiniteHandler"
      :is-loading="$apollo.loading"
    ></courses-table>
    <floating-action-button />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import currentSemesterCourses from '@/gql/currentSemesterCourses.gql'
import {
  currentSemesterCourseDataTransform,
  mergeCurrentSemesterCoursesData,
} from '@/utils'
export default {
  data() {
    return {
      courseList: {
        dataArray: [],
      },
      rowsPerPage: 5,
    }
  },
  computed: {
    ...mapGetters({
      keywords: 'search/keywords',
      tags: 'search/filterTags',
      isCompulsory: 'search/isCompulsory',
    }),
  },
  created() {
    this.restoreFromLocalStorage()
  },
  apollo: {
    courseList: {
      query: currentSemesterCourses,
      update: (data) => currentSemesterCourseDataTransform(data),
      variables() {
        return {
          keywords: this.keywords,
          rowsPerPage: this.rowsPerPage,
          after: '',
          tags: this.tags,
          compulsory: this.isCompulsory,
        }
      },
      debounce: 300,
      throttle: 300,
      fetchPolicy: 'network-only',
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      restoreFromLocalStorage: 'messages/restoreFromLocalStorage',
    }),
    infiniteHandler($state) {
      if (!this.courseList.hasNextPage) {
        $state.complete()
      } else {
        this.$apollo.queries.courseList
          .fetchMore({
            query: currentSemesterCourses,
            variables: {
              keywords: this.keywords,
              rowsPerPage: this.rowsPerPage,
              after: this.courseList.endCursor,
              tags: this.tags,
              compulsory: this.isCompulsory,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const result = mergeCurrentSemesterCoursesData(
                previousResult,
                fetchMoreResult
              )
              return result
            },
          })
          .then(() => {
            $state.loaded()
          })
      }
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
