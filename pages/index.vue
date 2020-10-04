<template>
  <div>
    <welcome-message></welcome-message>
    <ul class="flex border rounded-t-lg min-w-full shadow">
      <li class="w-1/2 text-center">
        <a
          v-if="isCourseList"
          class="clicked-tab w-full rounded-tr-lg"
          @click="changeToCourses"
          >קורסים</a
        >
        <a
          v-if="!isCourseList"
          class="not-clicked-tab w-full rounded-tr-lg"
          @click="changeToCourses"
          >קורסים</a
        >
      </li>
      <li class="w-1/2 text-center">
        <a
          class="not-clicked-tab w-full rounded-tl-lg"
          :class="{ 'clicked-tab': !isCourseList }"
          @click="changeToStaff"
          >סגל</a
        >
      </li>
    </ul>
    <search-bar
      class="label__search"
      :display-tag-buttons="isCourseList"
    ></search-bar>
    <div v-if="isCourseList" class="container min-w-full w-full">
      <courses-table
        :which-table="'courses'"
        :is-lecturer="false"
        :is-assist="false"
        :keywords="keywords"
        :course-list="courseList"
        :infinite-handler="infiniteHandlerCourses"
        :is-loading="$apollo.queries.courseList.loading"
      ></courses-table>
    </div>
    <div v-if="!isCourseList" class="container min-w-full w-full">
      <staff-table
        :keywords="keywords"
        :staff-list="allStaff"
        :infinite-handler="infiniteHandlerStaff"
        :is-loading="$apollo.queries.allStaff.loading"
      ></staff-table>
    </div>
    <floating-action-button />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import currentSemesterCourses from '@/gql/currentSemesterCourses.gql'
import allStaff from '@/gql/allStaff.gql'
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
    allStaff: {
      query: allStaff,
      variables() {
        return {
          search: this.keywords,
          first: this.rowsPerPage,
          after: '',
        }
      },
      debounce: 300,
      throttle: 300,
    },
  },
  methods: {
    ...mapActions({
      restoreFromLocalStorage: 'messages/restoreFromLocalStorage',
    }),
    ...mapMutations({
      clearTags: 'search/clearSelectedTags',
    }),
    infiniteHandlerCourses($state) {
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
    infiniteHandlerStaff($state) {
      if (!this.allStaff.pageInfo.hasNextPage) {
        $state.complete()
      } else {
        const endCursor = this.allStaff.pageInfo.endCursor
        this.$apollo.queries.allStaff
          .fetchMore({
            query: allStaff,
            variables: {
              search: this.keywords,
              first: this.rowsPerPage,
              after: endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const ret = { ...fetchMoreResult }
              ret.allStaff.edges = [
                ...previousResult.allStaff.edges,
                ...fetchMoreResult.allStaff.edges,
              ]
              return ret
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
      this.clearTags()
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
  @apply bg-primary;
  @apply inline-block;
  @apply py-2;
  @apply px-4;
  @apply text-white;
  @apply font-semibold;
  @apply cursor-pointer;
  @apply text-xl;
}

.not-clicked-tab {
  @apply inline-block;
  @apply py-2;
  @apply px-4;
  @apply cursor-pointer;
  @apply text-xl;
}

.not-clicked-tab:hover {
  @apply bg-primary-hover;
  @apply text-white;
}
</style>
