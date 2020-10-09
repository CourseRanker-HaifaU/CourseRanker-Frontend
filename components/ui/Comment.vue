<template>
  <li transition="slide">
    <div class="profile">
      <img :src="avatar" alt="תמונה אקראית כאווטאר לכותב/ת התגובה" />
    </div>
    <div class="msg">
      <div class="msg-body">
        <p class="name">
          {{ comment.authorName }}
        </p>
        <p>{{ comment.content }}</p>
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
  computed: {
    randomWord() {
      const num = Math.floor(Math.random() * 10)
      const word = Math.random().toString(36).substring(num)
      return word
    },
    avatar() {
      return 'https://robohash.org/' + this.randomWord + '?set=set2'
    },
  },
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>
