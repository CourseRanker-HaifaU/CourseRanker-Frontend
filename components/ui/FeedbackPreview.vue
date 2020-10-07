<template>
  <!-- component -->
  <!-- comment form -->
  <div
    class="flex mx-auto items-center justify-center shadow-lg mt-2 mx-2 mb-4 max-w-lg"
  >
    <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="profile"><img :src="avatar" alt="" /></div>
        <div class="w-full md:w-full px-3 mb-2 mt-2">
          <textarea
            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder="מלל חופשי של הכותב"
            required
            :disabled="true"
          ></textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      data: {},
    }
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

<style>
.comment-box {
  width: 100%;
  margin: auto;
}

img {
  border-radius: 50%;
}
</style>
