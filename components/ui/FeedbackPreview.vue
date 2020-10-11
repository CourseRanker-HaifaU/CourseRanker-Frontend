<template>
  <div
    v-if="feedbacks.edges.length > 0"
    class="flex"
    :class="{ 'w-full': myFeedbacks }"
  >
    <table
      class="min-w-full leading-normal"
      :class="{
        'lg:w-full text-right': myFeedbacks,
      }"
    >
      <thead>
        <tr :class="{ 'border-b-2 border-black': myFeedbacks }">
          <th v-if="myFeedbacks" class="td-style">שם הקורס</th>
          <th v-if="myFeedbacks" class="td-style">סימסטר</th>
          <th
            v-if="!myFeedbacks"
            :class="{ 'column-title': !myFeedbacks, 'td-style': myFeedbacks }"
          >
            ביקורת מילולית על הקורס
          </th>
          <th
            :class="{ 'column-title': !myFeedbacks, 'td-style': myFeedbacks }"
          >
            דירוג קורס
          </th>
          <th
            :class="{ 'column-title': !myFeedbacks, 'td-style': myFeedbacks }"
          >
            דירוג מרצה
          </th>
          <th
            :class="{ 'column-title': !myFeedbacks, 'td-style': myFeedbacks }"
          >
            דירוג מתרגל
          </th>
          <th
            :class="{ 'column-title': !myFeedbacks, 'td-style': myFeedbacks }"
          >
            נשלח בתאריך
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="edge in feedbacks.edges"
          :key="edge.node.id"
          class="row"
          @click="
            sendTo(`/feedback/${courseSemesterId}?feedbackId=${edge.node.id}`)
          "
        >
          <td v-if="myFeedbacks" class="td-my-courses">
            {{ edge.node.courseSemester.course.name }}
          </td>
          <td v-if="myFeedbacks" class="td-my-courses">
            {{ edge.node.courseSemester.semester.yearJewish }}
            {{ getSemester(edge.node.courseSemester.semester.name) }}
          </td>
          <td v-if="!myFeedbacks" :class="{ 'td-my-courses': myFeedbacks }">
            {{ edge.node.generalFeedback }}
          </td>
          <td :class="{ 'td-my-courses': myFeedbacks }">
            <rating :rating="edge.node.averageCourseRating"></rating>
          </td>
          <td :class="{ 'td-my-courses': myFeedbacks }">
            <rating :rating="edge.node.averageLecturerRating"></rating>
          </td>
          <td :class="{ 'td-my-courses': myFeedbacks }">
            <rating :rating="edge.node.averageTeachingAssistantRating"></rating>
          </td>
          <td :class="{ 'td-my-courses': myFeedbacks }">
            {{ getDate(edge.node.timestamp) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getSemester, getDate } from '@/utils'
export default {
  props: {
    courseSemesterId: {
      type: String,
      default() {
        return ''
      },
    },
    feedbacks: {
      type: Object,
      required: true,
    },
    myFeedbacks: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      data: {},
    }
  },
  methods: {
    getDate,
    getSemester,
    sendTo(msg) {
      this.$router.push(msg)
    },
  },
}
</script>

<style>
.td-style {
  @apply py-4;
  @apply px-1;
  @apply mx-0;
  @apply align-middle;
}

.td-my-courses {
  @apply w-1/5;
  @apply py-4;
  @apply mx-0;
  @apply font-normal;
}
.column-title {
  @apply px-5;
  @apply py-3;
  @apply bg-primary;
  @apply text-white;
}

.comment-box {
  width: 100%;
  margin: auto;
}

img {
  border-radius: 50%;
}
</style>
