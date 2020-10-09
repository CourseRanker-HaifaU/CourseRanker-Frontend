<template>
  <div v-if="courseData !== null" class="min-w-full items-stretch">
    <panel-page-title
      v-if="viewMode"
      :title="` חוות דעת על ${courseSemesterDetails.course.name}`"
      :course-id="`${courseSemesterDetails.course.id}`"
    ></panel-page-title>
    <panel-page-title
      v-if="!viewMode"
      :title="`הוספת חוות דעת על ${courseSemesterDetails.course.name}`"
      :course-id="`${courseSemesterDetails.course.id}`"
    ></panel-page-title>
    <div>
      <h2>שאלות כלליות</h2>
      <div
        v-for="question in generalQuestions"
        :key="question.id"
        class="items-baseline"
      >
        <div class="grid grid-cols-2">
          <div class="text-lg mb-2">
            {{ question.question }}
          </div>
          <div class="text-lg mb-2">
            <rating
              :editable="!viewMode"
              :rating="question.currentRating"
              @rating-set="ratingSet"
            />
          </div>
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
        <div class="grid grid-cols-2">
          <div class="text-lg mb-2">
            {{ question.question }}
          </div>
          <div class="text-lg mb-2">
            <rating
              :editable="!viewMode"
              :rating="question.currentRating"
              @rating-set="ratingSet"
            />
          </div>
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
        v-for="question in taQuestions"
        :key="question.id"
        class="items-baseline"
      >
        <div class="grid grid-cols-2">
          <div class="text-lg mb-2">
            {{ question.question }}
          </div>
          <div class="text-lg mb-2">
            <rating
              :editable="!viewMode"
              :rating="question.currentRating"
              @rating-set="ratingSet"
            />
          </div>
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
    <div v-if="viewMode" class="flex justify-center pt-4 ml-24">
      <div class="flex">
        <button class="button red-button">
          <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          לא אהבתי
        </button>
        <div class="mr-4 mt-2">{{ dislikes }}</div>
      </div>
      <div class="flex mr-16">
        <button class="button green-button">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          אהבתי
        </button>
        <div class="mr-4 mt-2">{{ likes }}</div>
      </div>
    </div>
    <div v-if="viewMode">
      <comments @commented="updateComment"></comments>
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

.like-button,
.dislike-button {
  opacity: 0.8;

  @apply cursor-pointer;
}

.like-button:hover,
.dislike-button:hover {
  opacity: 1;
}

.like-button:active {
  transform: translateY(-2px);
}

.dislike-button:active {
  transform: translateY(2px);
}

h2 {
  @apply text-xl;
  @apply font-bold;
  @apply underline;
  @apply pb-2;
}

img {
  border-radius: 0;
}
</style>

<script>
import feedbackForm from '@/gql/editFeedbackFormDetails.gql'
import courseSemesterDetails from '@/gql/courseSemesterDetails.gql'
export default {
  data() {
    return {
      availableFeedbackQuestions: {
        questions: {
          edges: [],
        },
      },
      generalFreeContent: '',
      lecturerFreeContent: '',
      taFreeContent: '',
      comments: [],
      loading: false,
      courseSemesterDetails: {
        course: {
          name: '',
        },
      },
    }
  },
  computed: {
    viewMode() {
      return !this.$route.query.edit
    },
    generalQuestions() {
      const gqList = []
      if (!('edges' in this.availableFeedbackQuestions.questions)) {
        return []
      }
      for (const item of this.availableFeedbackQuestions.questions.edges) {
        if (item.node.classification === 'A_3') {
          gqList.push(item.node)
        }
      }
      return gqList
    },
    lecturerQuestions() {
      const lqList = []
      if (!('edges' in this.availableFeedbackQuestions.questions)) {
        return []
      }
      for (const item of this.availableFeedbackQuestions.questions.edges) {
        if (item.node.classification === 'A_1') {
          lqList.push(item.node)
        }
      }
      return lqList
    },
    taQuestions() {
      const tqList = []
      if (!('edges' in this.availableFeedbackQuestions.questions)) {
        return []
      }
      for (const item of this.availableFeedbackQuestions.questions.edges) {
        if (item.node.classification === 'A_2') {
          tqList.push(item.node)
        }
      }
      return tqList
    },
    likes() {
      return 0
    },
    dislikes() {
      return 0
    },
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
    courseSemesterDetails: {
      query: courseSemesterDetails,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
    availableFeedbackQuestions: {
      query: feedbackForm,
      variables() {
        return {
          id: this.$route.query.feedbackId,
        }
      },
      update: (data) => data.feedbackForm,
    },
  },
}
</script>
