<template>
  <div class="w-full text-center">
    <panel-page-title :title="pageTitle" />
    <form
      class="grid grid-cols-2 gap-4 items-baseline min-w-full text-right"
      @submit.prevent="onSubmit"
    >
      <label for="label">כותרת השאלון:</label>
      <input-field
        id="label"
        v-model="label"
        label="כותרת השאלון"
        type="text"
      ></input-field>
      <label for="">שאלות על המרצה:</label>
      <checkbox-list v-model="selectedQuestions.lecturer" classification="1" />
      <label for="">שאלות על המתרגל:</label>
      <checkbox-list
        v-model="selectedQuestions.teachingAssistant"
        classification="2"
      />
      <label for="">שאלות על הקורס:</label>
      <checkbox-list v-model="selectedQuestions.course" classification="3" />
      <button class="button blue-button" type="submit">
        {{ buttonText }}
      </button>
      <button class="button red-button" type="button" @click="deleteForm">
        מחק
      </button>
    </form>
  </div>
</template>

<script>
import addFeedbackForm from '@/gql/addFeedbackForm.gql'
import editFeedbackForm from '@/gql/editFeedbackForm.gql'
import editFeedbackFormDetails from '@/gql/editFeedbackFormDetails.gql'
import deleteFeedbackForm from '@/gql/deleteFeedbackForm.gql'

import { showSuccessToast } from '@/utils'

const classificationMapping = {
  A_1: 'lecturer',
  A_2: 'teachingAssistant',
  A_3: 'course',
}

export default {
  data() {
    return {
      label: '',
      selectedQuestions: {
        lecturer: [],
        teachingAssistant: [],
        course: [],
      },
    }
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id
    },
    pageTitle() {
      return this.isEdit ? 'עריכת שאלון' : 'יצירת שאלון'
    },
    buttonText() {
      return this.isEdit ? 'שמור' : 'הוסף'
    },
  },
  created() {
    if (this.isEdit) {
      this.$apollo
        .query({
          query: editFeedbackFormDetails,
          variables: {
            id: this.$route.params.id,
          },
          fetchPolicy: 'no-cache',
        })
        .then((response) => {
          const serverData = response.data.feedbackForm
          this.label = serverData.label
          serverData.questions.edges.forEach(({ node }) => {
            this.selectedQuestions[
              classificationMapping[node.classification]
            ].push(node.id)
          })
        })
    }
  },
  methods: {
    async onSubmit() {
      await this.$apollo.mutate({
        mutation: this.isEdit ? editFeedbackForm : addFeedbackForm,
        variables: {
          input: {
            id: this.$route.params.id,
            label: this.label,
            questionIds: [
              ...this.selectedQuestions.course,
              ...this.selectedQuestions.lecturer,
              ...this.selectedQuestions.teachingAssistant,
            ],
          },
        },
      })
      showSuccessToast(
        this,
        this.isEdit ? 'עודכן בהצלחה' : 'נוצר בהצלחה',
        '/admin/feedback_forms'
      )
    },
    async deleteForm() {
      await this.$apollo.mutate({
        mutation: deleteFeedbackForm,
        variables: {
          id: this.$route.params.id,
        },
      })
      showSuccessToast(this, 'נמחק בהצלחה', '/admin/feedback_forms')
    },
  },
}
</script>
