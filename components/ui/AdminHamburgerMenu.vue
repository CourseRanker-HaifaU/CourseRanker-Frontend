<template>
  <div class="menu-div">
    <div style="height: 50px">
      <nuxt-link to="/" class="menu-link hover:text-blue-300 focus:outline-none"
        >פאנל מנהל</nuxt-link
      >
    </div>
    <div style="height: 50px">
      <nuxt-link
        to="/admin/add_course"
        class="menu-link hover:text-blue-300 focus:outline-none"
        >הוספת קורס</nuxt-link
      >
    </div>
    <div style="height: 50px">
      <nuxt-link
        to="/admin/add_semester_to_course"
        class="menu-link hover:text-blue-300 focus:outline-none"
        >הוספת סימסטר לקורס</nuxt-link
      >
    </div>
    <div style="height: 50px">
      <nuxt-link to="/" class="menu-link hover:text-blue-300 focus:outline-none"
        >עזרה</nuxt-link
      >
    </div>
    <div style="height: 50px">
      <button
        class="menu-link hover:text-blue-300 focus:outline-none"
        @click="logOut"
      >
        התנתקות
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$apolloHelpers.onLogout().then(() => {
        window.location = '/'
      })
    },
  },
}
</script>

<style>
.menu-div {
  @apply left-0;
  @apply z-10;
  @apply bg-primary;
  @apply shadow-lg;
  @apply absolute;
  @apply content-center;

  width: 250px;
  height: 350px;
  -moz-border-radius: 0 0 350px 0;
  -webkit-border-radius: 0 0 350px 0;
  border-right: 10px solid #fff;
}

.menu-link {
  @apply absolute;
  @apply text-white;
  @apply text-xl;
  @apply font-bold;

  margin-top: 20px;
  padding-right: 90px;
}
</style>
