<template>
  <div class="flex flex-col gap-y-10">
    <div v-for="detail in details" :key="detail.unit" class="container">
      <h2>{{ detail.name }}</h2>
      <div style="margin-bottom: 18px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
      </div>
      <div class="grid grid-flow-col grid-cols-4 grid-rows-2 gap-2">
        <div>
          <th>חוג:</th>
          <td>{{ detail.unit }}</td>
        </div>
        <div>
          <th>נקודות זכות:</th>
          <td>{{ detail.credit }}</td>
        </div>
        <div>
          <th>אופן הוראה:</th>
          <td>{{ detail.teachingMethod }}</td>
        </div>
        <div>
          <th>קהל יעד:</th>
          <td>{{ detail.audience }}</td>
        </div>
        <div>
          <th>סוג קורס:</th>
          <td>{{ detail.type }}</td>
        </div>
        <div>
          <th>דירוג ממוצע:</th>
          <td>
            <rating :rating="5" class="rating"></rating>
          </td>
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
h2 {
  @apply text-3xl;
  @apply font-bold;
  @apply ml-6;
}
td {
  padding-right: 0.5rem;
}
.rating {
  font-size: 6px;
}
</style>
