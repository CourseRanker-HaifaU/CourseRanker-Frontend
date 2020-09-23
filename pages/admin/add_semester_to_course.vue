<template>
  <div class="h-cover w-full text-right min-w-full">
    <panel-page-title title="הוספת סמסטר לקורס" back-button />
    <div class="mx-4 md:max-w-md min-w-full">
      <form
        class="grid grid-cols-2 gap-8 text-right grid-flow-row"
        @submit.prevent="onSubmit"
      >
        <label for="course">בחר קורס:</label>
        <div id="course">
          <multiselect
            v-model="selectedCourse"
            :options="courses"
            :searchable="false"
            :show-labels="false"
            placeholder="בחר קורס"
          ></multiselect>
        </div>
        <label for="selectedSemester">בחר שנה וסמסטר:</label>
        <div id="selectedSemester">
          <multiselect
            v-model="selectedSemester"
            :options="semesters"
            :searchable="false"
            :show-labels="false"
            placeholder="בחר שנה וסמסטר"
          ></multiselect>
        </div>
        <label for="selectedLecturers">בחר מרצים:</label>
        <div id="selectedLecturers">
          <multiselect
            v-model="selectedLecturers"
            tag-placeholder="בחר מרצים"
            placeholder="חפש או הוסף מרצה"
            label="name"
            track-by="code"
            :options="lecturers"
            :multiple="true"
            :taggable="true"
            :hide-selected="true"
            :show-labels="false"
          ></multiselect>
        </div>
        <label for="selectedTeachingAssistants">בחר מתרגלים:</label>
        <div id="selectedTeachingAssistants">
          <multiselect
            v-model="selectedTeachingAssistants"
            tag-placeholder="בחר מתרגלים"
            placeholder="חפש או הוסף מתרגל/ת"
            label="name"
            track-by="code"
            :options="assistants"
            :multiple="true"
            :taggable="true"
            :hide-selected="true"
            :show-labels="false"
          ></multiselect>
        </div>
        <button
          id="addCourse"
          type="submit"
          class="w-full button blue-button mt-4 col-start-2 focus:border-accent focus:shadow-outline"
        >
          הוסף
        </button>
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
      lecturer: { name: "פרופ' שולי וינטנר", code: 'sw' },
      lecturers: [
        { name: "פרופ' שולי וינטנר", code: 'sw' },
        { name: 'ד"ר אור מאיר', code: 'om' },
        { name: "פרופ' דני קרן", code: 'dk' },
        { name: 'ד"ר גיא אבני', code: 'ga' },
        { name: 'ד"ר ריטה אוסדצ\'י', code: 'ro' },
        { name: "פרופ' יוסי בן אשר", code: 'yba' },
        { name: "פרופ' אור דונקלמן", code: 'od' },
        { name: "פרופ' הל-אור חגית", code: 'hoh' },
        { name: "פרופ' אלק וינשטין", code: 'av' },
        { name: "פרופ' גדי לנדאו", code: 'gl' },
      ],
      assistant: { name: "גב' ליאת נתיב", code: 'ln' },
      assistants: [
        { name: "גב' ליאת נתיב'", code: 'ln' },
        { name: "גב' דניאל מוסקוביץ'", code: 'dn' },
        { name: 'מר אלעד טלבי', code: 'at' },
        { name: 'מר שי זילברקלנג', code: 'sz' },
        { name: "גב' אור-אל מרום", code: 'orm' },
        { name: "גב' רוז בדר", code: 'rb' },
        { name: "מר אליאס ג'דעון", code: 'ag' },
        { name: 'מר עמית שחר', code: 'as' },
        { name: 'מר נתן ולהיימר', code: 'nw' },
        { name: 'מר אילי עבוד', code: 'ea' },
        { name: "גב' רויאדה מאחמיד", code: 'rm' },
      ],
      semesters: ['א תשפ״א', 'ב׳ תשפ״א', 'קיץ תשפ״א'],
      courses: ['מבוא למדעי המחשב', 'אלגברה א׳', 'מתמטיקה דיסקרטית'],
      selectedCourse: '',
      selectedSemester: '',
      selectedLecturers: [],
      selectedTeachingAssistants: [],
    }
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      }
      this.options.push(tag)
      this.value.push(tag)
    },
  },
}
</script>
