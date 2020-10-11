<template>
  <div>
    <panel-page-title title="חוות הדעת שלי" />
    <feedback-preview
      :my-feedbacks="true"
      :course-semester-id="feedbacksList.edges[0].node.courseSemester.id"
      :feedbacks="feedbacksList"
    ></feedback-preview>
  </div>
</template>

<script>
import myFeedbacks from '@/gql/myFeedbacks.gql'
export default {
  data() {
    return {
      feedbacksList: {
        edges: {
          node: [],
        },
      },
    }
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
.user-panel-header {
  @apply w-full;
  @apply text-right;
  @apply text-primary;
}
</style>
