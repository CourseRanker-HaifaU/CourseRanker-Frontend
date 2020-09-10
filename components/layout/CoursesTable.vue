<template>
  <div class="frame-div flex items-stretch flex-shrink sm:text-sm md:text-base">
    <table>
      <tr class="catagories_row bg-primary text-white">
        <th class="border px-8 py-4">שם הקורס</th>
        <th class="border px-8 py-4">סימסטר</th>
        <th class="border px-8 py-4">נקודות זכות</th>
        <th class="border px-8 py-4">סוג קורס</th>
        <th class="border px-8 py-4">תיאור</th>
      </tr>
      <tr class="items_row cursor-pointer" @click="sendTo('/course')">
        <td class="border px-8 py-4">מבוא למדעי המחשב</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
        <td class="border px-8 py-4">סילבוס</td>
      </tr>
      <tr class="items_row cursor-pointer">
        <td class="border px-8 py-4">מתמטיקה דיסקרטית</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
        <td class="border px-8 py-4">סילבוס</td>
      </tr>
      <tr class="items_row cursor-pointer">
        <td class="border px-8 py-4">חדו"א א</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
        <td class="border px-8 py-4">סילבוס</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    sendTo(msg) {
      this.$router.push(msg)
    },
  },
}
</script>

<style scoped>
.catagories_row {
  text-align: right;
}
.items_row {
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  background: #f5f5f5;
  padding: 20px;
}
.items_row:hover {
  background: rgb(219, 219, 219);
}
th,
td {
  width: 400px;
  overflow: hidden;
}
</style>
