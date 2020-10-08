<template>
  <div class="comment-box">
    <div v-show="loading" class="loader">
      <span class="spinner"></span>
    </div>
    <div class="comment-list">
      <span v-show="loading" class="spinner"></span>
      <ul>
        <comment
          v-for="comment in comments"
          :key="comment.message"
          :comment="comment"
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
export default {
  data() {
    return {
      loading: false,
      comments: {
        sagi_com: {
          name: 'שומו שמיים',
          message: 'שלום לכולם',
          date: '07/10/2020',
          avatar: this.avatar(),
        },
        shubi: {
          name: 'זאב ערבות',
          message: 'זו בדיקה',
          date: '07/10/2020',
          avatar: this.avatar(),
        },
        dubi: {
          name: 'שוקי נגר',
          message: 'וזו עוד בדיקה',
          date: '07/10/2020',
          avatar: this.avatar(),
        },
      },
      data: {},
    }
  },
  methods: {
    randomWord() {
      const num = Math.floor(Math.random() * 10)
      const word = Math.random().toString(36).substring(num)
      return word
    },
    avatar() {
      return 'https://robohash.org/' + this.randomWord() + '?set=set2'
    },
    submit() {},
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
  width: 97.3%;
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
  border-color: #47b784;
  outline: none;
  box-shadow: inset 0 0 3px #ddd;
}
.comment-box input[type='submit'] {
  margin-bottom: 0;
  width: 30%;
  background-color: #47b784;
  color: #fff;
  border-color: #47b784;
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