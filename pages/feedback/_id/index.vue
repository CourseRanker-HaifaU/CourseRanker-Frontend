<template>
  <div v-if="courseData !== null" class="min-w-full items-stretch">
    <panel-page-title title="לשייך לשם המתאים"></panel-page-title>
    <div>
      <labeled-box-card
        :title="'שאלות כלליות'"
        :is-shown="isShown[0].value"
        body-class="grid gap-1 grid-rows-1 gap-y-3 border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        @toggle-shown="toggleShown(0)"
      >
        <div
          v-for="question in generalQuestions"
          :key="question.id"
          class="items-baseline"
        >
          <div class="text-lg mb-2">
            {{ question.content }}
          </div>
          <span>הדירוג שלי:</span>
          <rating
            editable
            :rating="question.currentRating"
            @rating-set="ratingSet"
          />
        </div>
        <div class="grid grid-rows gap-1 text-lg">
          <label for="generalFreeContent" class="font-bold">מלל חופשי</label>
          <textarea
            id="generalFreeContent"
            v-model="generalFreeContent"
            placeholder="מלל חופשי על הקורס..."
            rows="5"
            class="free-text"
          ></textarea>
        </div>
      </labeled-box-card>
    </div>
    <div>
      <labeled-box-card
        :title="'שאלות על מרצה הקורס'"
        :is-shown="isShown[1].value"
        body-class="grid gap-1 grid-rows-1 gap-y-3 border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        @toggle-shown="toggleShown(1)"
      >
        <div
          v-for="question in generalQuestions"
          :key="question.id"
          class="items-baseline"
        >
          <div class="text-lg mb-2">
            {{ question.content }}
          </div>
          <span>הדירוג שלי:</span>
          <rating
            editable
            :rating="question.currentRating"
            @rating-set="ratingSet"
          />
        </div>
        <div class="grid grid-rows gap-1 text-lg">
          <label for="lecturerFreeContent" class="font-bold">מלל חופשי</label>
          <textarea
            id="lecturerFreeContent"
            v-model="lecturerFreeContent"
            placeholder="מלל חופשי על מרצה הקורס..."
            rows="5"
            class="free-text"
          ></textarea>
        </div>
      </labeled-box-card>
    </div>
    <div>
      <labeled-box-card
        :title="'שאלות על מתרגלי הקורס'"
        :is-shown="isShown[2].value"
        body-class="grid gap-1 grid-rows-1 gap-y-3 border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        @toggle-shown="toggleShown(2)"
      >
        <div
          v-for="question in generalQuestions"
          :key="question.id"
          class="items-baseline"
        >
          <div class="text-lg mb-2">
            {{ question.content }}
          </div>
          <span>הדירוג שלי:</span>
          <rating
            editable
            :rating="question.currentRating"
            @rating-set="ratingSet"
          />
        </div>
        <div class="grid grid-rows gap-1 text-lg">
          <label for="taFreeContent" class="font-bold">מלל חופשי</label>
          <textarea
            id="taFreeContent"
            v-model="taFreeContent"
            placeholder="מלל חופשי על מתרגלי הקורס..."
            rows="5"
            class="free-text"
          ></textarea>
        </div>
      </labeled-box-card>
      <button class="button red-button">הוסף ביקורת</button>
    </div>
  </div>
</template>

<style scoped>
.free-text {
  border-style: inset;
  border-width: 3px;

  @apply rounded;
  @apply border-primary;
}

.free-text:focus {
  @apply outline-none;
  @apply border-accent;
}
</style>

<script>
import courseDetails from '@/gql/courseDetails.gql'
export default {
  data() {
    return {
      isShown: [
        {
          tag: 'שאלות כלליות',
          value: false,
        },
        {
          tag: 'שאלות מרצה',
          value: false,
        },
        {
          tag: 'שאלות מתרגל',
          value: false,
        },
      ],
      generalQuestions: [
        {
          id: 0,
          content: 'תוכן שאלה 1',
          currentRating: 1,
        },
        {
          id: 1,
          content: 'תוכן שאלה 2',
          currentRating: 1,
        },
        {
          id: 2,
          content: 'תוכן שאלה 3',
          currentRating: 1,
        },
      ],
      generalFreeContent: '',
      lecturerFreeContent: '',
      taFreeContent: '',
    }
  },
  methods: {
    toggleShown(index) {
      this.isShown[index].value = !this.isShown[index].value
    },
  },
  apollo: {
    courseData: {
      query: courseDetails,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
  },
}
</script>
