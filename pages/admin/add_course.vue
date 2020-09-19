<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <h1 class="text-primary text-4xl my-6">הוסף קורס</h1>
      <form
        class="grid grid-cols-2 grid-flow-row gap-4 text-right"
        @submit.prevent="onSubmit"
      >
        <input-field
          id="name"
          v-model="courseName"
          type="text"
          label="שם הקורס"
          class="mt-8"
        />
        <multiselect
          v-model="lecturer"
          tag-placeholder="בחר מרצה/ים/ות"
          placeholder="חפש או הוסף מרצה"
          label="name"
          track-by="code"
          :options="lecturers"
          :multiple="true"
          :taggable="true"
          :hide-selected="true"
        ></multiselect>
        <multiselect
          v-model="assistant"
          tag-placeholder="בחר מתרגל/ים/ות"
          placeholder="חפש או הוסף מתרגל/ת"
          label="name"
          track-by="code"
          tag-position="top"
          :options="assistants"
          :multiple="true"
          :taggable="true"
          :hide-selected="true"
        ></multiselect>
        <div class="flex flex-col">
          <div style="margin-left: 20px; margin-bottom: 5px">אופן הוראה:</div>
          <select v-model="selected" :class="divClass">
            <option>תרגול והרצאה</option>
            <option>הרצאה</option>
            <option>מעבדה</option>
            <option>סמינר</option>
            <option>פרוייקט</option>
          </select>
        </div>
        <div class="flex flex-col">
          <div style="margin-left: 20px; margin-bottom: 5px">סוג קורס:</div>
          <select v-model="selected" :class="divClass">
            <option>חובה</option>
            <option>בחירה</option>
            <option>דרך הרוח</option>
          </select>
        </div>
        <div class="flex flex-col">
          <div style="margin-left: 20px; margin-bottom: 5px">נקודות זכות:</div>
          <select v-model="selected" :class="divClass">
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="flex flex-col">
          <div style="margin-left: 20px; margin-bottom: 5px">קהל יעד:</div>
          <select v-model="selected" :class="divClass">
            <option>שנה א'</option>
            <option>שנה ב'</option>
            <option>שנה ג' ומעלה</option>
            <option>חוג</option>
            <option>כלל אוניברסיטאי</option>
          </select>
        </div>
        <div></div>
        <div class="flex flex-col">
          <input
            id="addCourse"
            type="submit"
            value="הוסף"
            class="focus:outline-none w-full button blue-button mt-4"
          />
        </div>
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
      assistant: { name: "פרופ' שולי וינטנר", code: 'sw' },
      assistants: [
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
