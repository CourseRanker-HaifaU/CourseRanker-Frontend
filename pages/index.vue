<template>
  <div class="container">
    <welcome-message v-if="showWelcome"></welcome-message>
    <search-bar class="label__search"></search-bar>
    <br />
    <nuxt-link to="/course">מבוא למדעי המחשב</nuxt-link>
    <table>
      <tr class="catagories_row">
        <th class="border px-8 py-4">שם הקורס</th>
        <th class="border px-8 py-4">סימסטר</th>
        <th class="border px-8 py-4">נקודות זכות</th>
        <th class="border px-8 py-4">סוג קורס</th>
      </tr>
      <tr class="items_row">
        <td class="border px-8 py-4">מבוא למדעי המחשב</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
      </tr>
      <tr class="items_row">
        <td class="border px-8 py-4">מתמטיקה דיסקרטית</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
      </tr>
      <tr class="items_row">
        <td class="border px-8 py-4">חדו"א א</td>
        <td class="border px-8 py-4">א'</td>
        <td class="border px-8 py-4">5</td>
        <td class="border px-8 py-4">חובה</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      showWelcome: 'messages/showWelcome',
    }),
  },
}
</script>

<style>
.catagories_row {
  text-align: right;
  background-color: mediumturquoise;
}
.items_row:hover {
  background-color: #cacad3;
}

/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
