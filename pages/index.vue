<template>
  <div class="container">
    <welcome-message></welcome-message>
    <search-bar class="label__search"></search-bar>
    <br />
    <courses-table
      :which-table="'myCourses'"
      :is-lecturer="false"
      :is-assist="false"
    ></courses-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created() {
    this.restoreFromLocalStorage()
  },
  methods: {
    ...mapActions({
      restoreFromLocalStorage: 'messages/restoreFromLocalStorage',
    }),
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
