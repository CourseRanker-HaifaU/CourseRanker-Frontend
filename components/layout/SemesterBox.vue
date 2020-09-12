<template>
  <div>
    <div
      v-for="(detail, index) in details"
      :key="detail.lecturer"
      class="container text-right mb-4"
    >
      <div
        class="flex flex-row bg-primary text-white items-baseline rounded-t-md px-2 pt-2"
        :class="{ 'rounded-md': !detail.isShown }"
      >
        <button
          class="mx-2"
          @click="details[index].isShown = !details[index].isShown"
        >
          <font-awesome-icon
            :icon="['fas', detail.isShown ? 'minus' : 'plus']"
          />
        </button>
        <h2 class="text-xl font-bold ml-2 pb-3">{{ detail.semester }}</h2>
      </div>
      <transition name="reveal" mode="out-in">
        <div
          v-show="detail.isShown"
          class="grid gap-1 grid-cols-2 gap-y-3 border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        >
          <div>
            <strong>מרצה:</strong>
            <span>{{ detail.lecturer }}</span>
          </div>
          <div>
            <strong>מתרגל/ת:</strong>
            <span>{{ detail.teachingAssistant }}</span>
          </div>
          <div>
            <strong>דירוג מרצה:</strong>
            <span>
              <rating :rating="5" class="rating"></rating>
            </span>
          </div>
          <div>
            <strong>דירוג מתרגל/ת:</strong>
            <span>
              <rating :rating="5" class="rating"></rating>
            </span>
          </div>
          <div>
            <strong>דירוג קורס:</strong>
            <span>
              <rating :rating="5" class="rating"></rating>
            </span>
          </div>
          <div>
            <strong>דירוג קורס + מרצה:</strong>
            <span>
              <rating :rating="5" class="rating"></rating>
            </span>
          </div>
          <div>
            <strong>דירוג קורס + מתרגל/ת:</strong>
            <span>
              <rating :rating="5" class="rating"></rating>
            </span>
          </div>
          <div>
            <button class="button blue-button ml-2">הוסף לקורסים שלי</button>
            <button class="button blue-button">הוסף חוות דעת</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: [
        {
          semester: 'סמסטר א\' תשפ"א',
          lecturer: 'שולי וינטנר',
          teachingAssistant: 'דניאל מובסוביץ',
          isShown: true,
        },
      ],
    }
  },
}
</script>

<style scoped>
div.grid div {
  @apply flex;
  @apply flex-row;
  @apply items-baseline;
}
div.grid div strong {
  @apply ml-2;
}
.reveal-enter,
.reveal-leave-active {
  @apply opacity-0;
}
.reveal-enter-active,
.reveal-leave-active {
  @apply transition-all;
  @apply duration-300;
  @apply ease-in;
}

.reveal-leave {
  @apply opacity-100;
}
</style>
