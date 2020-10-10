<template>
  <div class="comment-box">
    <h2 class="text-2xl font-bold text-primary tracking-wide">תגובות</h2>
    <div v-show="loading" class="loader">
      <span class="spinner"></span>
    </div>
    <div class="comment-list">
      <span v-show="loading" class="spinner"></span>
      <ul class="my-6">
        <comment
          v-for="({ node }, index) in comments"
          :key="node.id"
          :comment="node"
          :index="index"
          @edit-comment="beginEditComment"
          @delete-comment="deleteComment"
        ></comment>
      </ul>
    </div>
    <h3 class="text-xl font-bold text-primary tracking-wide mb-2">
      {{ isEditing ? 'עריכת תגובה' : 'הוספת תגובה חדשה' }}
    </h3>
    <form class="grid grid-cols-2 min-w-0" @submit.prevent="addComment">
      <label for="message">תוכן התגובה:</label>
      <textarea
        id="message"
        v-model="data.message"
        class="form-field h-24 mb-2"
        rows="3"
        placeholder="אנא מלא את תגובתך.."
        required
      ></textarea>
      <label for="isAnonymous">תגובה אנונימית:</label>
      <input
        id="isAnonymous"
        v-model="data.isAnonymous"
        type="checkbox"
        class="form-checkbox"
        :disabled="isEditing"
      />
      <button
        :disabled="loading"
        type="submit"
        class="button blue-button mt-2 col-start-2"
      >
        {{ isEditing ? 'שמור תגובה' : 'שלח תגובה' }}
      </button>
    </form>
  </div>
</template>

<script>
import deleteComment from '@/gql/deleteComment.gql'
import editComment from '@/gql/editComment.gql'
import addComment from '@/gql/addComment.gql'
import { showSuccessToast } from '@/utils'
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
    userFeedbackId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      data: {
        id: undefined,
        message: '',
        isAnonymous: true,
      },
      isEditing: false,
    }
  },
  methods: {
    async addComment() {
      const result = await this.$apollo.mutate({
        mutation: this.isEditing ? editComment : addComment,
        variables: {
          input: {
            id: this.data.id,
            content: this.data.message,
            userFeedbackId: this.isEditing ? undefined : this.userFeedbackId,
            isAnonymous: this.isEditing ? undefined : this.data.isAnonymous,
          },
        },
      })
      this.$emit('new-comment', {
        node: this.isEditing
          ? result.data.editComment.comment
          : result.data.addComment.comment,
      })
      showSuccessToast(
        this,
        this.isEditing ? 'התגובה נערכה בהצלחה' : 'התגובה נוספה בהצלחה'
      )
      this.clearNewComment()
      this.isEditing = false
    },
    beginEditComment(index) {
      this.isEditing = true
      const selectedComment = this.comments[index].node
      this.comments.splice(index, 1)
      this.data.message = selectedComment.content
      this.data.isAnonymous = selectedComment.isAnonymous
      this.data.id = selectedComment.id
    },
    async deleteComment(index) {
      const { id } = this.comments[index].node
      await this.$apollo.mutate({
        mutation: deleteComment,
        variables: {
          id,
        },
      })
      showSuccessToast(this, 'התגובה נמחקה בהצלחה', null, () => {
        this.comments.splice(index, 1)
      })
    },
    clearNewComment() {
      this.data.id = undefined
      this.data.message = ''
      this.data.isAnonymous = true
    },
  },
}
</script>
