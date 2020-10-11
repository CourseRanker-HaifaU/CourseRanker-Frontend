<template>
  <div v-if="feedbacks.edges.length > 0" class="flex">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th class="column-title">ביקורת מילולית על הקורס</th>
          <th class="column-title">דירוג קורס</th>
          <th class="column-title">דירוג מרצה</th>
          <th class="column-title">דירוג מתרגל</th>
          <th class="column-title">נשלח בתאריך</th>
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
          <td>{{ edge.node.generalFeedback }}</td>
          <td>
            <rating :rating="edge.node.averageCourseRating"></rating>
          </td>
          <td>
            <rating :rating="edge.node.averageLecturerRating"></rating>
          </td>
          <td>
            <rating :rating="edge.node.averageTeachingAssistantRating"></rating>
          </td>
          <td>{{ getDate(edge.node.timestamp) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getDate } from '@/utils'
export default {
  props: {
    avatar: {
      type: String,
      default() {
        return ''
      },
    },
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
  },
  data() {
    return {
      loading: false,
      data: {},
    }
  },
  methods: {
    getDate,
    sendTo(msg) {
      this.$router.push(msg)
    },
  },
}
</script>

<style>
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
