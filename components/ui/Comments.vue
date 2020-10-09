<template>
  <div class="comment-box">
    <div v-show="loading" class="loader">
      <span class="spinner"></span>
    </div>
    <div class="comment-list">
      <span v-show="loading" class="spinner"></span>
      <ul>
        <comment
          v-for="{ node } in comments"
          :key="node.id"
          :comment="node"
        ></comment>
      </ul>
    </div>
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
      />
      <button
        :disabled="loading"
        type="submit"
        class="button blue-button mt-2 col-start-2"
      >
        שלח תגובה
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
        message: '',
        isAnonymous: true,
      },
    }
  },
  methods: {
    async addComment() {
      const result = await this.$apollo.mutate({
        mutation: addComment,
        variables: {
          input: {
            content: this.data.message,
            userFeedbackId: this.userFeedbackId,
            isAnonymous: this.data.isAnonymous,
          },
        },
      })
      this.$emit('new-comment', { node: result.data.addComment.comment })
      showSuccessToast(this, 'התגובה נוספה בהצלחה')
      this.clearNewComment()
    },
    async editComment(index) {
      const currentNode = this.comments.edges[index].node
      await this.$apollo.mutate({
        mutation: editComment,
        variables: {
          input: {
            id: currentNode.id,
            content: currentNode.content,
          },
        },
      })
      showSuccessToast(this, 'התגובה נערכה בהצלחה')
      this.$apollo.queries.comments.refetch()
    },
    async deleteComment(index) {
      const { id } = this.comments.edges[index].node
      await this.$apollo.mutate({
        mutation: deleteComment,
        variables: {
          id,
        },
      })
      showSuccessToast(this, 'התגובה נמחקה בהצלחה', null, () => {
        this.comments.edges.splice(index, 1)
      })
    },
    clearNewComment() {
      this.data.name = ''
      this.data.message = ''
    },
  },
}
</script>

<style>
.comment-box {
  margin: auto;
}
.comment-box form {
  padding: 1rem;
}
.comment-list {
  padding: 1em 0;
}
.comment-list ul {
  margin: 0;
  padding: 1em;
}
.comment-list li {
  list-style: none;
  text-align: right;
  overflow: hidden;
  margin-bottom: 2em;
  padding: 0.4em;
}
.comment-list .profile {
  width: 80px;
  float: right;
}
.comment-list .profile img {
  border-radius: 50%;
  border: 2px solid #fff;
  width: 48px;
  height: 48px;
  background-color: #ddd;
  box-shadow: 0 0 5px #ddd;
}
.comment-list .msg {
  width: 86%;
  float: right;
  background-color: #fff;
  border-radius: 0 5px 5px 5px;
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.05);
  position: relative;
}
.comment-list .msg-body {
  padding: 0.8em;
  color: #666;
  line-height: 1.5;
}
.comment-list .msg-body p:last-child {
  margin-bottom: 0;
}
.comment-list .msg-body ::after {
  content: ' ';
  position: absolute;
  right: -13px;
  top: 0;
  border: 14px solid;
  border-color: #fff transparent transparent transparent;
}
.comment-list .name {
  margin: 0;
  color: #999;
  font-weight: bold;
  font-size: 0.8em;
}
.comment-list .date {
  float: right;
}
#comment {
  position: relative;
}
#comment .spinner {
  margin-top: 5em;
  z-index: 999;
}
#comment .loader {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
}
</style>
