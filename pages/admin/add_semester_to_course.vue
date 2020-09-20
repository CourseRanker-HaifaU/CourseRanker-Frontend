<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <h1 class="text-primary text-4xl my-6">הוסף סימסטר לקורס</h1>
      <form @submit.prevent="onSubmit">
        <div class="grid grid-cols-2 gap-8 text-right">
          <h1>בחר קורס:</h1>
          <select v-model="selected" :class="divClass">
            <option>מבוא למדעי המחשב</option>
            <option>אלגברה א'</option>
            <option>מתמטיקה דיסקרטית</option>
          </select>
          <h1>בחר שנה וסימסטר:</h1>
          <select v-model="selected" class="combo" :class="divClass">
            <option>תשפ"א א'</option>
            <option>תשפ"א ב'</option>
            <option>תשפ"א קיץ</option>
          </select>
        </div>
        <div class="text-right pt-2">
          <div style="margin-bottom: 30px; margin-top: 20px">
            <div style="margin-left: 20px; margin-bottom: 5px">
              בחר מרצה/ים/ות:
            </div>
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
          </div>
          <div style="margin-left: 20px; margin-bottom: 5px">
            בחר מתרגל/ים/ות:
          </div>
          <multiselect
            v-model="assistant"
            tag-placeholder="בחר מתרגל/ים/ות"
            placeholder="חפש או הוסף מתרגל/ת"
            label="name"
            track-by="code"
            :options="assistants"
            :multiple="true"
            :taggable="true"
            :hide-selected="true"
          ></multiselect>
          <div class="flex flex-col mt-8 py-2">
            <input
              id="addCourse"
              type="submit"
              value="הוסף"
              class="focus:outline-none w-full button blue-button mt-4"
            />
          </div>
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
<style scoped>
.multiselect__content-wrapper {
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
