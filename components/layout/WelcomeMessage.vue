<template>
  <div class="frame-div flex items-stretch">
    <div class="content-div flex-1 m-6 p-2">
      <button class="escape-button" @click="escape">x</button>
      <div class="text-center">
        <h1 class="text-primary text-4xl m-2">
          ברוכים הבאים לאתר הנדיר והמדהים הזה
        </h1>
        <p>באתר זה תוכלו לקרוא ולכתוב ביקורות על קורסים וסגל האוניברסיטה.</p>
        <p>
          נחשוב על כמה מילים על האתר, כגון: בקשה לפרסם ביקורות, לשמור על שפה
          נאותה, לזכור שמדובר בבני אדם וכו' וכו'...
        </p>
        <br />
        <p>ועד הסטודנטים, החוג למדעי המחשב.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    escape() {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },
  },
}
</script>

<style scoped>
.frame-div {
  width: 60vw;
  height: 40vh;
  margin-top: 10px;
  margin-bottom: 30px;
  background: #0664aa;
  border-radius: 10px;
}

.content-div {
  text-align: center;
  background: #fff;
  border-radius: 10px;
  overflow: visible;
  position: relative;
}

.escape-button {
  color: #fff;
  height: 30px;
  width: 30px;
  top: -10px;
  right: -10px;
  background: #d51111;
  border: 2px solid #fff;
  border-radius: 50%;
  position: absolute;
  -webkit-box-shadow-bottom: 5px rgba(0, 0, 0, 0.4);
  -moz-box-shadow-bottom: 5px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
}
</style>
