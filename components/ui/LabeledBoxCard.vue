<template>
  <div>
    <div class="container text-right mb-4">
      <div
        class="flex flex-row bg-primary text-white items-baseline rounded-t-md px-2 pt-2"
        :class="{ 'rounded-md': !isShown }"
      >
        <button class="mx-2" @click="triggerToggleShown">
          <font-awesome-icon :icon="['fas', isShown ? 'minus' : 'plus']" />
        </button>
        <h2 class="text-xl font-bold ml-2 pb-3">
          {{ title }}
        </h2>
      </div>
      <div v-show="isShown" :class="bodyClass">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabledBoxCard',
  props: {
    isShown: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bodyClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    triggerToggleShown() {
      this.$emit('toggle-shown')
    },
  },
}
</script>
