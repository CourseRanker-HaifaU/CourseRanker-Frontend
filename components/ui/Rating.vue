<template>
  <div class="rating-bar flex">
    <font-awesome-icon
      v-for="n in rating"
      :key="n + '_full'"
      :icon="['fas', 'star']"
    />
    <font-awesome-icon
      v-for="n in 5 - rating"
      :key="n + '_empty'"
      :icon="['far', 'star']"
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
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
