<template>
  <div class="w-full text-center">
    <panel-page-title title="דיווח על תוכן פוגעני" back-button />
    <form
      v-if="feedbackReport !== null"
      class="grid grid-cols-2 gap-4 items-baseline min-w-full text-right"
      @submit.prevent="onSubmit"
    >
      <label for="courseName">קורס:</label>
      <div id="courseName">
        {{ feedbackReport.userFeedback.courseSemester.course.name }}
      </div>
      <label for="semesterName">סמסטר:</label>
      <div id="semesterName">
        {{ getSemester(feedbackReport.userFeedback.courseSemester.semester) }}
      </div>
      <label for="feedbackAuthor">כותב/ת הביקורת:</label>
      <div id="feedbackAuthor">
        {{ feedbackReport.feedbackAuthor }}
      </div>
      <label for="feedbackLink">קישור לביקורת:</label>
      <div id="feedbackLink">
        <nuxt-link
          :to="`/feedback/${feedbackReport.userFeedback.courseSemester.id}?feedbackId=${feedbackReport.userFeedback.id}`"
          class="text-primary underline hover:text-primary-hover"
          >לחץ כאן</nuxt-link
        >
      </div>
      <label for="reportDate">תאריך דיווח:</label>
      <div id="reportDate">
        {{ getDate(feedbackReport.timestamp) }}
      </div>
      <label for="reportAuthor">דווח ע״י:</label>
      <div id="reportAuthor">
        {{
          `${feedbackReport.reportedBy.firstName} ${
            feedbackReport.reportedBy.lastName
          }, ${roleParser(feedbackReport.reportedBy.role)}`
        }}
      </div>
      <label for="description">תיאור התלונה:</label>
      <div id="description">
        {{ feedbackReport.description }}
      </div>
      <label for="answer">תשובה:</label>
      <textarea
        id="answer"
        v-model="feedbackReport.answer"
        class="form-field h-32"
      ></textarea>
      <label for="isJustified">תלונה מוצדקת:</label>
      <input
        id="isJustified"
        v-model="isJustified"
        type="checkbox"
        class="form-checkbox"
      />
      <button type="submit" class="button blue-button">ערוך</button>
      <button class="button red-button" @click="deleteReport">מחק</button>
    </form>
  </div>
</template>

<script>
import feedbackReport from '@/gql/feedbackReport.gql'
import editFeedbackReport from '@/gql/editFeedbackReport.gql'
import deleteFeedbackReport from '@/gql/deleteFeedbackReport.gql'
import { getSemester, getDate, roleParser, showSuccessToast } from '@/utils'

export default {
  data() {
    return {
      feedbackReport: null,
    }
  },
  computed: {
    isJustified: {
      get() {
        if (this.feedbackReport.status === 'A_2') {
          return true
        }
        return false
      },
      set(val) {
        if (val) {
          this.feedbackReport.status = 'A_2'
        } else {
          this.feedbackReport.status = 'A_3'
        }
      },
    },
  },
  apollo: {
    feedbackReport: {
      query: feedbackReport,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
      fetchPolicy: 'no-cache',
    },
  },
  methods: {
    getSemester,
    getDate,
    roleParser,
    async onSubmit() {
      await this.$apollo.mutate({
        mutation: editFeedbackReport,
        variables: {
          input: {
            id: this.$route.params.id,
            answer: this.feedbackReport.answer,
            isResolved: this.isJustified,
          },
        },
      })
      showSuccessToast(this, 'המענה לדיווח נשמר בהצלחה!', '/admin/reports')
    },
    async deleteReport() {
      await this.$apollo.mutate({
        mutation: deleteFeedbackReport,
        variables: {
          id: this.$route.params.id,
        },
      })
      showSuccessToast(this, 'הדיווח נמחק בהצלחה', '/admin/reports')
    },
  },
}
</script>
