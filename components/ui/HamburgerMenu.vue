<template>
  <div class="menu-div">
    <nuxt-link
      v-for="link in links"
      :key="link.link"
      :to="link.link"
      class="menu-link focus-outline-none"
      exact-active-class="bg-primary-hover"
      exact
      @click.native="emitMenuClose"
    >
      {{ link.label }}
    </nuxt-link>
    <button class="menu-link focus:outline-none text-right" @click="logOut">
      התנתקות
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      adminLinks: [
        {
          label: 'פאנל מנהל',
          link: '/admin',
        },
        {
          label: 'ניהול משתמשים',
          link: '/admin/users_manager',
        },
        {
          label: 'הוספת קורס',
          link: '/admin/course',
        },
        {
          label: 'הוספת איש סגל',
          link: '/admin/add_staff',
        },
        {
          label: 'הוספת סמסטר לקורס',
          link: '/admin/add_semester_to_course',
        },
        {
          label: 'דיווחים על תוכן פוגעני',
          link: '/admin/violation_page',
        },
      ],
      userLinks: [
        {
          label: 'פאנל משתמש',
          link: '/',
        },
        {
          label: 'הקורסים שלי',
          link: '/my_courses',
        },
        {
          label: 'חוות הדעת שלי',
          link: '/my_feedbacks',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'user_data/isAdmin',
    }),
    links() {
      let ret = []
      if (this.isAdmin) {
        ret = [...this.adminLinks]
      }
      ret = [...ret, ...this.userLinks]
      return ret
    },
  },
  methods: {
    ...mapActions({
      clearUserData: 'user_data/clearData',
    }),
    emitMenuClose() {
      this.$emit('menu-close')
    },
    logOut() {
      this.emitMenuClose()
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
  @apply flex;
  @apply flex-col;
  @apply items-start;

  @apply rounded-br-lg;
}

.menu-link {
  @apply text-white;
  @apply text-xl;
  @apply font-bold;
  @apply py-4;
  @apply px-3;
  @apply w-full;
}

.menu-link:hover {
  @apply bg-primary-hover;
}

.menu-link:last-of-type:hover {
  @apply rounded-br-lg;
}
</style>
