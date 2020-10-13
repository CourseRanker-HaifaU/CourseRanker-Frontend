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
          ברוכים הבאים לאתר המשובים של החוג למדעי המחשב
        </h1>
        <p>כאן תוכלו לדרג את הקורסים ואת חברי הסגל שלכם.</p>
        <p>
          האתר נוצר ע"י ועד הסטודנטים בחוג במטרה לעודד שיתוף מידע ושקיפות בקרב
          הסטודנטים בחוג. אנחנו מעודדים אתכם לשתף מהחוויות, ההמלצות והדעות שלכם
          לטובת הכלל.
        </p>
        <p>
          <b> אנא שמרו על שפה ראויה ועל ביקורת הוגנת. </b>
        </p>
        <p>
          לשאלות ולתמיכה טכנית ניתן ליצור קשר עם הועד - cs.haifa.uni@gmail.com
        </p>
        <br />
        <p>ועד הסטודנטים, החוג למדעי המחשב</p>
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
  @apply w-full;
}

.frame-close-div {
  @apply mt-6;
  @apply mb-2;
  @apply mr-3;
  @apply rounded-lg;
  @apply bg-primary;
  @apply w-full;

  height: 3vh;
}

.content-open-div {
  @apply flex-1;
  @apply m-6;
  @apply p-6;
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
