<template>
  <error-message :message="errorMessage"></error-message>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessage() {
      const customMessages = {
        400: 'שגיאה בחיבור לשרת, אנא פנו לצוות האתר',
        404: 'העמוד לא נמצא',
        500: 'שגיאת שרת, אנא נסו שוב מאוחר יותר',
      }
      if (this.error.statusCode in customMessages) {
        return customMessages[this.error.statusCode]
      }
      return this.error.message
    },
  },
}
</script>
