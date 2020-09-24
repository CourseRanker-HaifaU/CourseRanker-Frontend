<template>
  <div class="menu-div">
    <div style="height: 50px">
      <nuxt-link to="/" class="menu-link hover:text-blue-300 focus:outline-none"
        >פאנל משתמש</nuxt-link
      >
    </div>
    <div style="height: 50px">
      <nuxt-link
        to="/my_courses"
        class="menu-link hover:text-blue-300 focus:outline-none"
        >הקורסים שלי</nuxt-link
      >
    </div>
    <div style="height: 50px">
      <nuxt-link to="/" class="menu-link hover:text-blue-300 focus:outline-none"
        >חוות הדעת שלי</nuxt-link
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
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      clearUserData: 'user_data/clearData',
    }),
    logOut() {
      this.clearUserData()
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
  border-radius: 0 0 350px 0;
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
