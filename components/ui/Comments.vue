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
    <form action="" method="post" @submit.prevent="submit">
      <input
        v-model="data.name"
        class="input-name"
        type="text"
        name="name"
        placeholder="שם מלא"
        required
      />
      <textarea
        v-model="data.message"
        class="input-message"
        name="message"
        rows="3"
        placeholder="אנא מלא את תגובתך.."
        required
      ></textarea>
      <input :disabled="loading" type="submit" value="שלח תגובה" />
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
  },
  data() {
    return {
      loading: false,
      data: {
        name: '',
        message: '',
      },
    }
  },
  methods: {
    async addComment() {
      await this.$apollo.mutate({
        mutation: addComment,
        variables: {
          input: {
            content: this.data.message,
          },
        },
      })
      showSuccessToast(this, 'התגובה נוספה בהצלחה')
      this.$apollo.queries.comments.refetch()
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
  width: 100%;
  margin: auto;
}
.comment-box form {
  padding: 1rem;
}
.comment-box input,
.comment-box textarea {
  font-size: 0.8em;
  width: 70%;
  padding: 0.6em;
  border: 1px solid #eee;
  background-color: #f7f7f7;
  display: block;
  margin-bottom: 1em;
  font-family: 'Raleway', sans-serif;
  transition: all ease 0.3s;
}
.comment-box input:focus,
.comment-box textarea:focus {
  border-color: #0664aa;
  outline: none;
  box-shadow: inset 0 0 3px #ddd;
}
.comment-box input[type='submit'] {
  margin-bottom: 0;
  margin-right: 15rem;
  width: 30%;
  background-color: #0664aa;
  color: #fff;
  border-color: #0664aa;
  font-weight: bold;
  text-transform: uppercase;
}
.comment-box input[type='submit']:focus {
  background-color: #36495d;
}
.comment-box input[type='submit']:disabled {
  opacity: 0.6;
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
