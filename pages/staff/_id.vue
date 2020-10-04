<template>
  <div
    v-if="
      staffDetails.firstName.length !== 0 && staffDetails.lastName.length !== 0
    "
  >
    <div class="mt-4 min-w-full">
      <h1 class="text-3xl font-bold mb-2 text-primary">
        {{ staffToString(staffDetails) }}
      </h1>
      <section
        id="averageRatings"
        class="flex flex-col md:flex-row justify-start text-lg"
      >
        <article class="flex flex-row items-center md:ml-4">
          <span class="ml-2">דירוג ממוצע כמרצה:</span>
          <rating :rating="staffDetails.averageRatingAsLecturer"></rating>
        </article>
        <article class="flex lex-row items-center">
          <span class="ml-2">דירוג ממוצע כמתרגל/ת:</span>
          <rating
            :rating="staffDetails.averageRatingAsTeachingAssistant"
          ></rating>
        </article>
      </section>
      <hr class="border-0 bg-gray-500 text-gray-500 h-px my-8" />
      <h2 class="text-xl font-bold">קורסים שהועברו על ידי חבר/ת הסגל:</h2>
      <courses-by-staff-table
        :staff-course-list="staffCourseList"
        :is-loading="$apollo.loading"
        :infinite-handler="infiniteHandler"
        :staff-id="$route.params.id"
      ></courses-by-staff-table>
      <floating-action-button />
    </div>
  </div>
</template>

<script>
import staffDetails from '@/gql/staffDetails.gql'
import { staffToString } from '@/utils'

export default {
  props: {
    isLecturer: {
      /* if it's a lecturer page -> isLecturer == true
         if it's a teaching assistant -> isLecturer == false  */
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      lecturersPerPage: 5,
      teachingAssistantsPerPage: 5,
      staffDetails: {
        lecturers: {
          edges: [],
        },
        teachingAssistants: {
          edges: [],
        },
        firstName: '',
        lastName: '',
        title: '',
        averageRatingAsLecturer: 0,
        averageRatingAsTeachingAssistant: 0,
      },
    }
  },
  computed: {
    staffCourseList() {
      if (!this.staffDetails || !this.staffDetails.lecturers) {
        return undefined
      }
      return [
        ...this.staffDetails.lecturers.edges,
        ...this.staffDetails.teachingAssistants.edges,
      ]
    },
  },
  apollo: {
    staffDetails: {
      query: staffDetails,
      variables() {
        return {
          id: this.$route.params.id,
          lecturersPerPage: this.lecturersPerPage,
          teachingAssistantsPerPage: this.teachingAssistantsPerPage,
          lecturersAfter: '',
          teachingAssistantsAfter: '',
        }
      },
      update: (data) => data.staff,
      errorPolicy: 'all',
      error(error) {
        this.$nuxt.error({ statusCode: 400, message: error })
      },
      fetchPolicy: 'network-only',
    },
  },
  methods: {
    staffToString,
    infiniteHandler($state) {
      if (
        !this.staffDetails.lecturers.pageInfo.hasNextPage &&
        !this.staffDetails.teachingAssistants.pageInfo.hasNextPage
      ) {
        $state.complete()
      } else {
        this.$apollo.queries.staffDetails
          .fetchMore({
            query: staffDetails,
            variables: {
              id: this.$route.params.id,
              lecturersPerPage: this.lecturersPerPage,
              teachingAssistantsPerPage: this.teachingAssistantsPerPage,
              lecturersAfter: this.staffDetails.lecturers.pageInfo.endCursor,
              teachingAssistantsAfter: this.staffDetails.teachingAssistants
                .pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult
              } else {
                const ret = { ...fetchMoreResult }
                if (previousResult.staff.lecturers.pageInfo.hasNextPage) {
                  ret.staff.lecturers.edges = [
                    ...previousResult.staff.lecturers.edges,
                    ...fetchMoreResult.staff.lecturers.edges,
                  ]
                }
                if (
                  previousResult.staff.teachingAssistants.pageInfo.hasNextPage
                ) {
                  ret.staff.teachingAssistants.edges = [
                    ...previousResult.staff.teachingAssistants.edges,
                    ...fetchMoreResult.staff.teachingAssistants.edges,
                  ]
                }
                return ret
              }
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
