<template>
  <div class="flex flex-col gap-y-10 mt-4">
    <div v-for="detail in details" :key="detail.unit" class="container">
      <h1 class="text-3xl font-bold ml-6">{{ detail.name }}</h1>
      <div style="margin-bottom: 18px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
      </div>
      <div class="grid grid-flow-col grid-cols-4 grid-rows-2 gap-2 mb-10">
        <div>
          <strong>חוג:</strong>
          <span>{{ detail.unit }}</span>
        </div>
        <div>
          <strong>נקודות זכות:</strong>
          <span>{{ detail.credit }}</span>
        </div>
        <div>
          <strong>אופן הוראה:</strong>
          <span>{{ detail.teachingMethod }}</span>
        </div>
        <div>
          <strong>קהל יעד:</strong>
          <span>{{ detail.audience }}</span>
        </div>
        <div>
          <strong>סוג קורס:</strong>
          <span>{{ detail.type }}</span>
        </div>
        <div class="flex flex-row items-baseline">
          <strong>דירוג ממוצע:</strong>
          <span><rating :rating="5" class="rating"></rating></span>
        </div>
      </div>
      <semester-box></semester-box>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: [
        {
          name: 'מבוא למדעי המחשב',
          unit: 'מדעי המחשב',
          credit: 5,
          teachingMethod: 'הרצאה ותרגול',
          audience: 'חוג',
          type: 'חובה',
        },
      ],
    }
  },
}
</script>

<style scoped>
div span {
  @apply mr-2;
}
</style>
