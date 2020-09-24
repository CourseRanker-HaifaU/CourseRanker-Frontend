<template>
  <div class="top-and-menu relative">
    <div class="top-bar">
      <div class="bar-block">
        <nuxt-link to="/" class="h-full inline-flex">
          <img
            class="h-full rounded-full"
            src="~/assets/images/logoranker.png"
            alt="לוגו ועד הסטודנטים"
          />
          <div
            class="mr-6 flex flex-col justify-center items-center tracking-wider"
          >
            <span>ועד הסטודנטים</span>
            <span>בחוג למדעי המחשב</span>
          </div>
        </nuxt-link>
      </div>
      <div class="bar-block">
        <nuxt-link
          v-if="!isLoggedIn"
          to="/login"
          class="button red-button bar-btn"
        >
          התחברות
        </nuxt-link>
      </div>
      <div v-if="isLoggedIn" class="bar-block">
        <button class="button red-button bar-btn" @click="isOpen = !isOpen">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
    </div>
    <div v-show="isOpen">
      <!-- This is the hamburger-menu component, will be shown when isOpen -->
      <hamburger-menu @menu-close="isOpen = false"></hamburger-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'user_data/isAdmin',
    }),
    isLoggedIn() {
      return !!this.$apolloHelpers.getToken()
    },
  },
}
</script>

<style scoped>
.top-bar {
  @apply relative;
  @apply flex;
  @apply h-20;
  @apply bg-primary;
  @apply px-6;
  @apply py-2;
  @apply items-center;
  @apply justify-between;
  @apply text-blue-100;
  @apply border-accent;
  @apply border-b-4;
}

.bar-btn {
  @apply border;
  @apply border-white;
  @apply rounded-md;
  @apply m-1; /* Delete later */
}

.bar-block {
  @apply h-full;
  @apply inline-flex;
  @apply items-center;
}
</style>
