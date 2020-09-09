<template>
  <div class="frame-div flex items-stretch">
    <div
      class="flex-1 m-6 p-2 flex flex-col justify-center items-center bg-white rounded-lg overflow-visible relative"
    >
      <button class="escape-button" @click="escape">x</button>
      <div class="text-center">
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
export default {
  methods: {
    escape() {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },
  },
}
</script>

<style scoped>
.frame-div {
  @apply mt-6;
  @apply mb-8;
  @apply rounded-lg;
  @apply bg-primary;

  width: 60vw;
  height: 40vh;
}

.escape-button {
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
