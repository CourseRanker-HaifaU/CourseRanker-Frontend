<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="הוספת קורס" back-button />
    <form class="min-w-full grid grid-cols-2 gap-4" @submit.prevent="onSubmit">
      <label for="course-name" class="my-auto text-right">שם הקורס:</label>
      <input-field
        id="course-name"
        v-model="courseName"
        type="text"
        class="text-right min-w-full"
      />
      <label for="course-type" class="my-auto text-right">אופן הוראה:</label>
      <div id="course-type">
        <multiselect
          v-model="courseType"
          :options="courseTypes"
          :searchable="false"
          :show-labels="false"
          placeholder="בחר אופן הוראה"
          label="name"
          track-by="id"
        ></multiselect>
      </div>
      <label for="is-compulsory" class="my-auto text-right">קורס חובה:</label>
      <div class="text-right">
        <input
          id="is-compulsory"
          v-model="isCompulsory"
          type="checkbox"
          class="form-checkbox"
        />
      </div>
      <label for="points" class="my-auto text-right">נקודות זכות:</label>
      <input-field
        id="points"
        v-model="points"
        type="number"
        class="text-right min-w-full"
      />
      <label for="course-classification" class="my-auto text-right">
        קהל יעד:
      </label>
      <div id="course-classification">
        <multiselect
          v-model="classification"
          :options="classifications"
          :searchable="false"
          :show-labels="false"
          placeholder="בחר קהל יעד"
          label="name"
          track-by="id"
        ></multiselect>
      </div>
      <button
        id="addCourse"
        type="submit"
        class="focus:outline-none w-full button blue-button mt-4 col-span-2 md:col-span-1 md:col-start-2"
      >
        הוסף
      </button>
    </form>
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
      courseName: '',
      courseTypes: [
        {
          id: 'CL',
          name: 'שיעור ותרגול',
        },
        {
          id: 'SE',
          name: 'סמינר',
        },
        {
          id: 'LA',
          name: 'מעבדה',
        },
      ],
      isCompulsory: true,
      points: 5,
      classifications: [
        {
          id: 'UN',
          name: 'פקולטה/חוג',
        },
        {
          id: 'ET',
          name: 'אתגר',
        },
        {
          id: 'ALL',
          name: 'כלל אוניברסיטאי',
        },
      ],
      courseType: null,
      classification: null,
    }
  },
}
</script>
