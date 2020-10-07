<template>
  <div class="flex">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th class="column-title">כותב הביקורת</th>
          <th class="column-title">ביקורת מילולית על הקורס</th>
          <th class="column-title">דירוג קורס</th>
          <th class="column-title">דירוג מרצה</th>
          <th class="column-title">דירוג מתרגל</th>
          <th class="column-title">נשלח בתאריך</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="sendTo(`/feedback/${courseId}`)">
          <td class="row items-center">
            <div class="flex flex-row col-span-2">
              <img :src="avatar" alt="" height="50" width="50" />
              <h1 class="mt-4">שגיא גוילי</h1>
            </div>
          </td>
          <td class="row">אחלה בחלה של קורס</td>
          <td class="row">
            <rating class="rating"></rating>
          </td>
          <td class="row"><rating class="rating"></rating></td>
          <td class="row">
            <rating class="rating"></rating>
          </td>
          <td class="row">07.10.2020</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default() {
        return ''
      },
    },
    courseId: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      loading: false,
      data: {},
    }
  },
  methods: {
    sendTo(msg) {
      this.$router.push(msg)
    },
  },
}
</script>

<style>
.column-title {
  @apply px-5;
  @apply py-3;
  @apply bg-primary;
  @apply text-white;
}

.row {
  @apply px-5;
  @apply py-5;
  @apply border-b;
  @apply border-gray-200;
  @apply bg-white;
  @apply text-sm;
  @apply cursor-pointer;
}

.comment-box {
  width: 100%;
  margin: auto;
}

img {
  border-radius: 50%;
}
</style>
