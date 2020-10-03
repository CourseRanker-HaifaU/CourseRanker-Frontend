<template>
  <div>
    <welcome-message></welcome-message>
    <ul class="flex border-b">
      <li class="-mb-px mr-1">
        <a
          class="clicked-tab"
          :class="{ 'not-clicked-tab': !isCourseList }"
          @click="changeToCourses"
          >קורסים</a
        >
      </li>
      <li class="mr-1">
        <a
          class="not-clicked-tab"
          :class="{ 'clicked-tab': !isCourseList }"
          @click="changeToStaff"
          >מרצים</a
        >
      </li>
    </ul>
    <div v-if="isCourseList" class="container">
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
    <div v-if="!isCourseList">
      <h2>Here should be a staff table</h2>
    </div>
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
      isCourseList: true,
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
    changeToCourses() {
      this.isCourseList = true
    },
    changeToStaff() {
      this.isCourseList = false
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

.clicked-tab {
  @apply bg-white;
  @apply inline-block;
  @apply border-l;
  @apply border-t;
  @apply border-r;
  @apply rounded-t;
  @apply py-2;
  @apply px-4;
  @apply text-blue-700;
  @apply font-semibold;
  @apply text-blue-500;
}

.not-clicked-tab {
  @apply bg-white;
  @apply inline-block;
  @apply py-2;
  @apply px-4;
}

.not-clicked-tab:hover {
  @apply text-blue-800;
  @apply font-semibold;
}
</style>
