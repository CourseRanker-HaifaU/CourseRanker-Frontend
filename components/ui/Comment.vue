<template>
  <li transition="slide">
    <div class="profile"><img :src="avatar" alt="" /></div>
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
  computed: {
    avatar() {
      return (
        'https://api.adorable.io/avatars/48/' +
        this.randomWord
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, '-') +
        '@adorable.io.png'
      )
    },
  },
  methods: {
    randomWord() {
      const num = Math.floor(Math.random() * 10)
      return Math.random().toString(36).substring(num)
    },
  },
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>
