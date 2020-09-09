<template>
  <div class="frame-div flex items-stretch">
    <table>
      <tr class="catagories_row bg-primary text-white">
        <th class="border px-8 py-4">שם הקורס</th>
        <th class="border px-8 py-4">סימסטר</th>
        <th class="border px-8 py-4">נקודות זכות</th>
        <th class="border px-8 py-4">סוג קורס</th>
      </tr>
      <tr class="items_row cursor-pointer">
        <td class="border px-8 py-4">מבוא למדעי המחשב</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
      </tr>
      <tr class="items_row cursor-pointer">
        <td class="border px-8 py-4">מתמטיקה דיסקרטית</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
      </tr>
      <tr class="items_row cursor-pointer">
        <td class="border px-8 py-4">חדו"א א</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.catagories_row {
  text-align: right;
}
.items_row:hover {
  background-color: #cacad3;
}
</style>
