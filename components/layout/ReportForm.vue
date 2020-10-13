<template>
  <div class="my-8">
    <h2 class="text-2xl font-bold text-primary tracking-wide">
      דיווח על חוות הדעת
    </h2>
    <p>
      <strong>שימו לב:</strong> הוספת דיווח מוחקת כל דיווח קיים על אותה חוות
      דעת.
    </p>
    <form class="grid grid-cols-2 min-w-0" @submit.prevent="addReport">
      <label for="message">תוכן הדיווח:</label>
      <textarea
        id="message"
        v-model="message"
        class="form-field h-24 mb-2"
        rows="3"
        placeholder="אנא מלא פרטים על הדיווח - סיבת הדיווח ופרטים נוספים כרצונך.."
        required
      ></textarea>
      <button class="button red-button mt-2" @click="closeForm">
        בטל דיווח
      </button>
      <button type="submit" class="button blue-button mt-2 mr-2">
        שלח דיווח
      </button>
    </form>
  </div>
</template>

<script>
import addFeedbackReport from '@/gql/addFeedbackReport.gql'
import { showSuccessToast } from '@/utils'
export default {
  props: {
    feedbackId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    closeForm() {
      this.$emit('close-form')
    },
    async addReport() {
      await this.$apollo.mutate({
        mutation: addFeedbackReport,
        variables: {
          input: {
            userFeedbackId: this.feedbackId,
            description: this.message,
          },
        },
      })
      showSuccessToast(
        this,
        'דיווח נוסף בהצלחה! שימו לב: דיווח זה מבטל את כל הדיווחים הקודמים על אותה חוות דעת.',
        null,
        () => {
          this.closeForm()
        }
      )
    },
  },
}
</script>
