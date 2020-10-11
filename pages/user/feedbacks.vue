<template>
  <div>
    <panel-page-title title="חוות הדעת שלי" />
    <div v-if="feedbacksList.edges.length > 0" class="flex w-full">
      <table class="min-w-full leading-normal lg:w-full text-right">
        <thead>
          <tr class="border-b-2 border-black">
            <th>שם הקורס</th>
            <th>סימסטר</th>
            <th>דירוג קורס</th>
            <th>דירוג מרצה</th>
            <th>דירוג מתרגל</th>
            <th>נשלח בתאריך</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="edge in feedbacksList.edges"
            :key="edge.node.id"
            class="row"
            @click="
              sendTo(
                `/feedback/${edge.node.courseSemester.id}?feedbackId=${edge.node.id}`
              )
            "
          >
            <td>
              {{ edge.node.courseSemester.course.name }}
            </td>
            <td>
              {{ getSemester(edge.node.courseSemester.semester) }}
            </td>
            <td v-if="!myFeedbacks">
              {{ edge.node.generalFeedback }}
            </td>
            <td>
              <rating :rating="edge.node.averageCourseRating"></rating>
            </td>
            <td>
              <rating :rating="edge.node.averageLecturerRating"></rating>
            </td>
            <td>
              <rating
                :rating="edge.node.averageTeachingAssistantRating"
              ></rating>
            </td>
            <td>
              {{ getDate(edge.node.timestamp) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import myFeedbacks from '@/gql/myFeedbacks.gql'
import { getSemester, getDate } from '@/utils'

export default {
  data() {
    return {
      feedbacksList: {
        edges: {
          node: [],
        },
      },
      myFeedbacks: true,
    }
  },
  methods: {
    getDate,
    getSemester,
    sendTo(msg) {
      this.$router.push(msg)
    },
  },
  apollo: {
    feedbacksList: {
      query: myFeedbacks,
      update: (data) => {
        return data.myFeedbacks
      },
    },
  },
}
</script>

<style scoped>
th {
  @apply py-4;
  @apply px-1;
  @apply mx-0;
  @apply align-middle;
}

.td {
  @apply w-1/5;
  @apply py-4;
  @apply mx-0;
  @apply font-normal;
}

.user-panel-header {
  @apply w-full;
  @apply text-right;
  @apply text-primary;
}
</style>
