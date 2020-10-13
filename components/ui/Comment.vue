<template>
  <li
    transition="slide"
    class="flex flex-row p-4 rounded-lg border border-solid border-primary my-2 items-center justify-between"
  >
    <div class="flex flex-row">
      <div class="profile">
        <img
          :src="avatar"
          class="rounded-full w-16 h-16 border border-solid border-dark"
          alt="תמונה אקראית כאווטאר לכותב/ת התגובה"
        />
      </div>
      <div class="msg mr-6">
        <p class="font-bold">
          {{ comment.authorName }}
        </p>
        <p>{{ comment.content }}</p>
      </div>
    </div>
    <div v-if="comment.canEdit">
      <button class="button blue-button" @click="editComment">עריכה</button>
      <button class="button red-button mr-2" @click="deleteComment">
        מחיקה
      </button>
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
    index: {
      type: Number,
      required: true,
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
  methods: {
    editComment() {
      this.$emit('edit-comment', this.index)
    },
    deleteComment() {
      this.$emit('delete-comment', this.index)
    },
  },
}
</script>
