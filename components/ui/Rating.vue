<template>
  <div>
    <div
      class="rating-bar flex not-sr-only"
      aria-hidden="true"
      :class="{ 'cursor-pointer': editable }"
    >
      <font-awesome-icon
        v-for="n in 5"
        :key="n"
        class="text-primary"
        :size="size"
        :icon="[displayRating >= n ? 'fas' : 'far', 'star']"
        :aria-label="n + ' מתוך 5'"
        @mouseover="mouseOver(n)"
        @mouseout="mouseOut"
        @click="ratingSet(n)"
      />
    </div>
    <div class="sr-only">
      <div v-if="editable">
        <select
          :value="rating"
          aria-label="דירוג (1-5)"
          @change="ratingSet($event.target.value)"
        >
          <option
            v-for="n in 5"
            :key="n"
            :value="n"
            :aria-label="n + 'מתוך 5'"
          ></option>
        </select>
      </div>
      <span v-if="!editable">Rating: {{ rating }}</span>
    </div>
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
    size: {
      type: String,
      default: 'xs',
    },
  },
  data() {
    return {
      hoverRating: null,
    }
  },
  computed: {
    displayRating() {
      return Math.round(
        this.hoverRating === null ? this.rating : this.hoverRating
      )
    },
  },
  methods: {
    ratingSet(number) {
      if (this.editable) {
        this.$emit('rating-set', number)
      }
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
