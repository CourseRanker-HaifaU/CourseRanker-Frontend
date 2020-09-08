<template>
  <div id="app">
    <form @submit.prevent="onSubmit">
      <h2 class="label-wrapper">
        <label for="new-todo-input" class="label__lg">
          שם הקורס: מבוא למדעי המחשב
        </label>
        <label for="new-todo-input" class="label__lg">
          שם החוג: מדעי המחשב
        </label>
        <button type="submit">חזור לדף הראשי</button>
      </h2>
    </form>
    <rating editable></rating>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      this.$router.push('/')
    },
  },
}
</script>
