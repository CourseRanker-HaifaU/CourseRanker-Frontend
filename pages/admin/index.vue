<template>
  <div>
    <panel-page-title title="פאנל מנהל" />
    <div class="self-start flex flex-row items-start justify-start flex-wrap">
      <nuxt-link to="/admin/users_manager" class="button blue-button ml-2 my-2">
        ניהול משתמשים
      </nuxt-link>
      <nuxt-link to="/admin/course" class="button blue-button ml-2 my-2">
        הוספת קורס חדש
      </nuxt-link>
      <nuxt-link to="/admin/staff" class="button blue-button ml-2 my-2">
        הוספת איש סגל
      </nuxt-link>
      <nuxt-link
        to="/admin/course_semester"
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
          v-model="foreignYear"
          type="number"
          div-class="text-right"
        />
        <label for="selectedSemester">סמסטר:</label>
        <div id="selectedSemester">
          <multiselect
            v-model="selectedSemester"
            label="text"
            track-by="code"
            :searchable="false"
            :show-labels="false"
            :options="semesterTypes"
            placeholder="בחר סמסטר"
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
import addSemester from '@/gql/addSemester.gql'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedSemester: { code: 'A', text: 'א׳' },
      semesterTypes: [
        { code: 'A', text: 'א׳' },
        { code: 'B', text: 'ב׳' },
        { code: 'SUMMER', text: 'קיץ' },
      ],
      hebYear: '',
      foreignYear: new Date().getFullYear().toString(),
    }
  },
  methods: {
    sendTo(msg) {
      this.$router.push('/admin/' + msg)
    },
    async onSubmit() {
      await this.$apollo.mutate({
        mutation: addSemester,
        variables: {
          input: {
            semName: this.selectedSemester.code,
            semYearGregorian: this.foreignYear,
            semYearJewish: this.hebYear,
          },
        },
      })
      this.$router.go() // Refresh the page
    },
  },
}
</script>
