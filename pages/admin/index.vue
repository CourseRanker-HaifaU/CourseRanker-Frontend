<template>
  <div>
    <div class="my-4 min-w-full">
      <h1 class="text-4xl text-primary">פאנל מנהל</h1>
      <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
    </div>
    <div class="self-start">
      <button
        class="button blue-button ml-2 my-2"
        @click="sendTo(`add_course`)"
      >
        הוספת קורס חדש
      </button>
      <button
        class="button blue-button ml-2 my-2"
        @click="sendTo(`add_semester_to_course`)"
      >
        הוספת סימסטר לקורס
      </button>
      <button
        class="button blue-button ml-2 my-2"
        @click="sendTo(`violation_page`)"
      >
        דיווחי תוכן פוגעני
      </button>
    </div>
    <div class="h-cover w-full mt-6">
      <h2 class="text-2xl underline">הגדרת סמסטר נוכחי</h2>
      <form
        class="flex flex-col md:flex-row min-w-full items-stretch justify-around py-4 md:my-2 md:max-w-md"
        @submit.prevent="onSubmit"
      >
        <input-field
          id="hebrew"
          v-model="hebYear"
          type="text"
          label="שנה עברית"
          div-class="text-right mx-2"
        />
        <input-field
          id="foreign"
          v-model="foriegnYear"
          type="number"
          label="שנה לועזית"
          div-class="text-right mx-2"
        />
        <div class="mx-2">
          <label for="selectedSemester">סמסטר:</label>
          <select id="selectedSemester" v-model="selected" class="form-field">
            <option>א'</option>
            <option>ב'</option>
            <option>קיץ</option>
          </select>
        </div>
        <input
          id="addSemester"
          type="submit"
          value="הוסף"
          class="button red-button mt-6 mx-2"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sendTo(msg) {
      this.$router.push('/admin/' + msg)
    },
  },
}
</script>
