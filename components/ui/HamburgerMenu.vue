<template>
  <div class="menu-div">
    <button
      v-if="isAdmin"
      class="menu-link-title focus:outline-none text-right"
      @click="sendTo('/admin')"
    >
      פאנל מנהל
    </button>
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
    <button
      class="menu-link-title focus:outline-none text-right"
      :class="{ 'upper-line': isAdmin }"
      @click="sendTo('/user')"
    >
      פאנל משתמש
    </button>
    <nuxt-link
      v-for="link in userLinks"
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
          label: 'ניהול משתמשים',
          link: '/admin/users_manager',
        },
        {
          label: 'הוספת קורס',
          link: '/admin/course',
        },
        {
          label: 'הוספת איש סגל',
          link: '/admin/staff',
        },
        {
          label: 'הוספת סמסטר לקורס',
          link: '/admin/course_semester',
        },
        {
          label: 'שאלות דירוג',
          link: '/admin/questions',
        },
        {
          label: 'שאלונים',
          link: '/admin/feedback_forms',
        },
        {
          label: 'דיווחים על תוכן פוגעני',
          link: '/admin/violation_page',
        },
      ],
      userLinks: [
        {
          label: 'הקורסים שלי',
          link: '/user/courses',
        },
        {
          label: 'חוות הדעת שלי',
          link: '/user/feedbacks',
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
    sendTo(msg) {
      this.$router.push(msg)
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

.menu-link-title {
  @apply text-white;
  @apply text-xl;
  @apply font-bold;
  @apply py-4;
  @apply px-3;
  @apply w-full;

  border-bottom: 1px solid black;
}

.upper-line {
  border-top: 3px solid white;
}

.menu-link:hover {
  @apply bg-primary-hover;
}

.menu-link-title:hover {
  @apply bg-primary-hover;
}

.menu-link:last-of-type:hover {
  @apply rounded-br-lg;
}
</style>
