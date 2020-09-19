<template>
  <div>
    <div class="flex flex-col gap-y-10 mt-4 min-w-full items-stretch">
      <h1 class="text-3xl font-bold ml-6">פאנל מנהל</h1>
      <div style="margin-bottom: 18px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
      </div>
    </div>
    <div>
      <button class="button blue-button ml-2">הוספת קורס חדש</button>
      <button class="button blue-button ml-2">הוספת סימסטר לקורס</button>
      <button class="button blue-button ml-2">דיווחי תוכן פוגעני</button>
    </div>
    <div class="h-cover w-full text-center">
      <h1 style="margin-left: 1200px; margin-top: 40px">
        <b>
          <u>הגדרת סימסטר נוכחי</u>
        </b>
      </h1>
      <div class="w-full p-4 m-2 md:max-w-md">
        <form class="emulated-flex-gap" @submit.prevent="onSubmit">
          <input-field
            id="hebrew"
            v-model="hebYear"
            type="hebrew"
            label="שנה עברית"
            div-class="mb-8 text-right"
          />
          <input-field
            id="foreign"
            v-model="foriegnYear"
            type="foreign"
            label="שנה לועזית"
            div-class="mb-8 text-right"
          />
          <div class="flex flex-col">
            <div style="margin-left: 20px; margin-bottom: 5px">סימסטר:</div>
            <select v-model="selected" :class="divClass">
              <option>א'</option>
              <option>ב'</option>
              <option>קיץ</option>
            </select>
          </div>
          <div class="flex flex-col">
            <input
              id="addSemester"
              type="submit"
              value="הוסף"
              class="button red-button mt-2"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
h1 {
  margin-right: 1rem;
}

.emulated-flex-gap > * {
  margin: 18px 0 0 18px;
}

.emulated-flex-gap {
  display: inline-flex;
  flex-wrap: nowrap;
  margin: -18px 0 0 -18px;
  width: calc(100% + 12px);
}
</style>
