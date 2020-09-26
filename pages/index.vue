<template>
  <div class="container">
    <welcome-message></welcome-message>
    <search-bar v-model="keywords" class="label__search"></search-bar>
    <br />
    <courses-table
      :which-table="'courses'"
      :keywords="keywords"
    ></courses-table>
    <floating-action-button />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      keywords: '',
    }
  },
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
