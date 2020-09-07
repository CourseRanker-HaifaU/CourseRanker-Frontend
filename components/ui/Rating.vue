<template>
  <div class="rating-bar flex" :class="{ 'cursor-pointer': editable }">
    <font-awesome-icon
      v-for="n in 5"
      :key="n"
      class="fa-2x text-primary"
      :icon="[displayRating >= n ? 'fas' : 'far', 'star']"
      @mouseover="mouseOver(n)"
      @mouseout="mouseOut"
      @click="ratingSet(n)"
    />
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    rating: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 5
      },
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hoverRating: null,
    }
  },
  computed: {
    displayRating() {
      return this.hoverRating === null ? this.rating : this.hoverRating
    },
  },
  methods: {
    ratingSet(number) {
      this.$emit('rating-set', number)
    },
    mouseOver(n) {
      if (this.editable) {
        this.hoverRating = n
      }
    },
    mouseOut() {
      if (this.editable) {
        this.hoverRating = null
      }
    },
  },
}
</script>
