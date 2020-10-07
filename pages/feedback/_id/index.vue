<template>
  <div v-if="courseData !== null" class="min-w-full items-stretch">
    <panel-page-title title="לשייך לשם המתאים"></panel-page-title>
    <div>
      <h2>שאלות כלליות {{ viewMode }}</h2>
      <div
        v-for="question in generalQuestions"
        :key="question.id"
        class="items-baseline"
      >
        <div v-if="!viewMode">
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
        <div v-if="viewMode">
          <div class="text-lg mb-2">
            {{ question.content }}
          </div>
          <rating
            editable
            :rating="question.currentRating"
            @rating-set="ratingSet"
          />
        </div>
      </div>
      <div class="grid grid-rows gap-1 text-lg">
        <label for="generalFreeContent" class="font-bold">מלל חופשי</label>
        <textarea
          id="generalFreeContent"
          v-model="generalFreeContent"
          placeholder="מלל חופשי על הקורס..."
          rows="5"
          class="free-text"
          :disabled="viewMode"
        ></textarea>
      </div>
    </div>
    <div class="paragraph-comp">
      <h2>שאלות מרצה</h2>
      <div
        v-for="question in lecturerQuestions"
        :key="question.id"
        class="items-baseline"
      >
        <div v-if="!viewMode">
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
        <div v-if="viewMode">
          <div class="text-lg mb-2">
            {{ question.content }}
          </div>
          <rating
            editable
            :rating="question.currentRating"
            @rating-set="ratingSet"
          />
        </div>
      </div>
      <div class="grid grid-rows gap-1 text-lg">
        <label for="lecturerFreeContent" class="font-bold">מלל חופשי</label>
        <textarea
          id="lecturerFreeContent"
          v-model="lecturerFreeContent"
          placeholder="מלל חופשי על מרצה הקורס..."
          rows="5"
          class="free-text"
          :disabled="viewMode"
        ></textarea>
      </div>
    </div>
    <div class="paragraph-comp">
      <h2>שאלות מתרגל</h2>
      <div
        v-for="question in generalQuestions"
        :key="question.id"
        class="items-baseline"
      >
        <div v-if="!viewMode">
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
        <div v-if="viewMode">
          <div class="text-lg mb-2">
            {{ question.content }}
          </div>
          <rating
            editable
            :rating="question.currentRating"
            @rating-set="ratingSet"
          />
        </div>
      </div>
      <div class="grid grid-rows gap-1 text-lg">
        <label for="taFreeContent" class="font-bold">מלל חופשי</label>
        <textarea
          id="taFreeContent"
          v-model="taFreeContent"
          placeholder="מלל חופשי על מתרגלי הקורס..."
          rows="5"
          class="free-text"
          :disabled="viewMode"
        ></textarea>
      </div>
    </div>
    <div v-if="!viewMode" class="submit">
      <button class="button red-button">הוסף ביקורת</button>
    </div>
    <div v-if="!viewMode">
      <feedbacks @commented="updateComment"></feedbacks>
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

.paragraph-comp {
  @apply pt-12;
}

.submit {
  margin-right: 38rem;

  @apply pt-6;
  @apply pb-6;
}

h2 {
  @apply text-xl;
  @apply font-bold;
  @apply underline;
}
</style>

<script>
import availableFeedbackQuestions from '@/gql/availableFeedbackQuestions.gql'
import courseDetails from '@/gql/courseDetails.gql'
export default {
  props: {
    viewMode: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
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
      lecturerQuestions: [],
      taQuestions: [],
      generalFreeContent: '',
      lecturerFreeContent: '',
      taFreeContent: '',
      question: 'What you think about Vue.js',
      comments: [],
      loading: false,
    }
  },
  methods: {
    toggleShown(index) {
      this.isShown[index].value = !this.isShown[index].value
    },
    updateComment(comment) {
      this.comments.push(comment)
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
    lecturerQuestions: {
      query: availableFeedbackQuestions,
      variables() {
        return {
          classification: 'A_1',
        }
      },
    },
  },
}
</script>
