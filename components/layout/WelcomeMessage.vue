<template>
  <div
    :class="{
      'frame-open-div': welcomeState,
      'frame-close-div': !welcomeState,
    }"
    class="flex items-stretch"
  >
    <div
      :class="{
        'content-open-div': welcomeState,
        'content-close-div': !welcomeState,
      }"
    >
      <button
        :class="{
          'fold-button': welcomeState,
          'unfold-button': !welcomeState,
        }"
        @click="keepWelcomeState"
      >
        <font-awesome-icon :icon="['fas', welcomeState ? 'minus' : 'plus']" />
      </button>
      <div v-if="welcomeState" class="text-center">
        <h1 class="text-primary text-4xl m-2">
          ברוכים הבאים לאתר הנדיר והמדהים הזה
        </h1>
        <p>באתר זה תוכלו לקרוא ולכתוב ביקורות על קורסים וסגל האוניברסיטה.</p>
        <p>
          נחשוב על כמה מילים על האתר, כגון: בקשה לפרסם ביקורות, לשמור על שפה
          נאותה, לזכור שמדובר בבני אדם וכו' וכו'...
        </p>
        <br />
        <p>ועד הסטודנטים, החוג למדעי המחשב.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      welcomeState: 'messages/welcomeState',
    }),
  },
  methods: {
    ...mapActions({
      keepWelcomeState: 'messages/keepWelcomeState',
    }),
  },
}
</script>

<style scoped>
.frame-open-div {
  @apply mt-6;
  @apply mb-8;
  @apply rounded-lg;
  @apply bg-primary;

  width: 60vw;
  height: 40vh;
}

.frame-close-div {
  @apply mt-6;
  @apply mb-2;
  @apply rounded-lg;
  @apply bg-primary;

  width: 60vw;
  height: 3vh;
}

.content-open-div {
  @apply flex-1;
  @apply m-6;
  @apply p-2;
  @apply flex;
  @apply flex-col;
  @apply justify-center;
  @apply items-center;
  @apply bg-white;
  @apply rounded-lg;
  @apply overflow-visible;
  @apply relative;
}

.content-close-div {
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply relative;
}

.unfold-button,
.fold-button {
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply outline-none;
}

.unfold-button {
  @apply text-white;
  @apply w-8;
  @apply h-8;
  @apply bg-primary;
  @apply border-2;
  @apply border-solid;
  @apply border-white;
  @apply rounded-full;
  @apply shadow-md;
  @apply absolute;
}

.fold-button {
  @apply text-white;
  @apply w-8;
  @apply h-8;
  @apply bg-accent;
  @apply border-2;
  @apply border-solid;
  @apply border-white;
  @apply rounded-full;
  @apply shadow-md;
  @apply absolute;

  top: -10px;
  right: -10px;
}
</style>
