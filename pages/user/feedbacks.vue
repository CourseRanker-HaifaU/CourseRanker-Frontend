<template>
  <div>
    <panel-page-title title="הקורסים שלי" />
    <feedback-preview
      :my-feedbacks="true"
      :course-semester-id="feedbacksList.edges.node.courseSemester.id"
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
          node: {
            id: '',
            averageCourseRating: '',
            averageLecturerRating: '',
            averageTeachingAssistantRating: '',
            courseSemester: {
              course: {
                name: '',
              },
              semester: {
                name: '',
                yearJewish: '',
              },
            },
          },
        },
      },
    }
  },
  apollo: {
    feedbacksList: {
      query: myFeedbacks,
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
