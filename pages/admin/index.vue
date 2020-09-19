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
    <div>
      <h1 style="margin-left: 1200px; margin-top: 70px">
        <b><u>הגדרת סימסטר נוכחי</u></b>
      </h1>
      <p style="margin-right: 30px">
        שנה עברית:
        <input />
        שנה לועזית:
        <input />
        סימסטר:
        <input />
        <button class="button red-button ml-2">הוסף</button>
      </p>
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

input:focus {
  outline: none;
  border: 0;
  box-shadow: none;
}
</style>
