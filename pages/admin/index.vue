<template>
  <div>
    <panel-page-title title="פאנל מנהל" />
    <div class="self-start flex flex-row items-start justify-start flex-wrap">
      <nuxt-link to="/admin/add_course" class="button blue-button ml-2 my-2">
        הוספת קורס חדש
      </nuxt-link>
      <nuxt-link
        to="/admin/add_semester_to_course"
        class="button blue-button ml-2 my-2"
      >
        הוספת סמסטר לקורס
      </nuxt-link>
      <nuxt-link
        to="/admin/violation_page"
        class="button blue-button ml-2 my-2"
      >
        דיווחים על תוכן פוגעני
      </nuxt-link>
    </div>
    <div class="h-cover w-full mt-6">
      <h2 class="text-2xl underline">הגדרת סמסטר נוכחי</h2>
      <form
        class="grid grid-cols-2 gap-4 min-w-full py-4 md:my-2 md:max-w-md"
        @submit.prevent="onSubmit"
      >
        <label for="hebrew">שנה עברית:</label>
        <input-field
          id="hebrew"
          v-model="hebYear"
          type="text"
          div-class="text-right"
        />
        <label for="foreign">שנה לועזית:</label>
        <input-field
          id="foreign"
          v-model="foriegnYear"
          type="number"
          div-class="text-right"
        />
        <label for="selectedSemester">סמסטר:</label>
        <div id="selectedSemester">
          <multiselect
            v-model="selectedSemester"
            :options="semesterTypes"
            :searchable="false"
            :show-labels="false"
            placeholder="א׳"
          >
          </multiselect>
        </div>
        <input
          id="addSemester"
          type="submit"
          value="הוסף"
          class="button red-button mt-6 col-start-2"
        />
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedSemester: 'א׳',
      semesterTypes: ['א', 'ב', 'קיץ'],
    }
  },
  methods: {
    sendTo(msg) {
      this.$router.push('/admin/' + msg)
    },
  },
}
</script>
