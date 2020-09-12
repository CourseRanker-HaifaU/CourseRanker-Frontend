<template>
  <div
    :class="{
      'frame-open-div': semesterState,
      'frame-close-div': !semesterState,
    }"
    class="flex items-stretch"
  >
    <div
      :class="{
        'content-open-div': semesterState,
        'content-close-div': !semesterState,
      }"
    >
      <button
        :class="{
          'fold-button': semesterState,
          'unfold-button': !semesterState,
        }"
        @click="keepSemesterState"
      >
        <font-awesome-icon :icon="['fas', semesterState ? 'minus' : 'plus']" />
      </button>
      <div v-if="semesterState" class="text-right">
        <div v-for="detail in details" :key="detail.lecturer" class="container">
          <h1>{{ detail.semester }}</h1>
          <div class="grid gap-1 grid-cols-2 gap-y-3">
            <div>
              <th>מרצה:</th>
              <td>{{ detail.lecturer }}</td>
            </div>
            <div>
              <th>מתרגל/ת:</th>
              <td>{{ detail.teachingAssistant }}</td>
            </div>
            <div>
              <th>דירוג מרצה:</th>
              <td>
                <rating :rating="5" class="rating"></rating>
              </td>
            </div>
            <div>
              <th>דירוג מתרגל/ת:</th>
              <td>
                <rating :rating="5" class="rating"></rating>
              </td>
            </div>
            <div>
              <th>דירוג קורס:</th>
              <td>
                <rating :rating="5" class="rating"></rating>
              </td>
            </div>
            <div>
              <th>דירוג קורס + מרצה:</th>
              <td>
                <rating :rating="5" class="rating"></rating>
              </td>
            </div>
            <div>
              <th>דירוג קורס + מתרגל/ת:</th>
              <td>
                <rating :rating="5" class="rating"></rating>
              </td>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      details: [
        {
          semester: 'סימסטר א\' תשפ"א',
          lecturer: 'שולי וינטנר',
          teachingAssistant: 'דניאל מובסוביץ',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      semesterState: 'messages/semesterState',
    }),
  },
  methods: {
    ...mapActions({
      keepSemesterState: 'messages/keepSemesterState',
    }),
  },
}
</script>

<style scoped>
h1 {
  padding-bottom: 0.75rem;
  @apply text-xl;
  @apply font-bold;
  @apply ml-2;
}
td {
  padding-right: 0.5rem;
}
.rating {
  font-size: 6px;
}
.frame-open-div {
  @apply mt-6;
  @apply mb-8;
  @apply rounded-lg;
}

.frame-close-div {
  @apply mt-6;
  @apply mb-2;
  @apply rounded-lg;
  @apply bg-primary;
}

.content-open-div {
  @apply flex-1;
  @apply flex;
  @apply flex-col;
  @apply bg-white;
  @apply rounded-lg;
  @apply overflow-visible;
  @apply relative;
}

.content-close-div {
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply relative;
}

.unfold-button,
.fold-button {
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply outline-none;
}

.unfold-button {
  @apply text-white;
  @apply w-8;
  @apply h-8;
  @apply bg-primary;
  @apply border-2;
  @apply border-solid;
  @apply border-white;
  @apply rounded-full;
  @apply shadow-md;
  @apply absolute;
}

.fold-button {
  @apply text-white;
  @apply w-8;
  @apply h-8;
  @apply bg-accent;
  @apply border-2;
  @apply border-solid;
  @apply border-white;
  @apply rounded-full;
  @apply shadow-md;
  @apply absolute;

  top: -10px;
  right: -10px;
}
</style>
