<template>
  <div class="container">
    <welcome-message v-if="showWelcome"></welcome-message>
    <search-bar class="label__search"></search-bar>
    <br />
    <courses-table></courses-table>
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
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
