<template>
  <li transition="slide">
    <div class="profile"><img :src="comment.avatar" alt="" /></div>
    <div class="msg">
      <div class="msg-body">
        <p class="name">
          {{ comment.name }} <span class="date">{{ comment.time }}</span>
        </p>
        <p v-html="comment.message"></p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return null
      },
    },
  },
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>
