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
      <button class="button blue-button">
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<script>
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
  methods: {
    onSubmit() {},
  },
}
</script>
