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
        <div></div>
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
export default {
  data() {
    return {
      courseName: '',
    }
  },
}
</script>
