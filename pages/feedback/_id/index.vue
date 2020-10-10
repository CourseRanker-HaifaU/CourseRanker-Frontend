<template>
  <div class="min-w-full items-stretch">
    <panel-page-title
      v-if="viewMode"
      :title="` חוות דעת על ${feedbackFormDetails.course.name}`"
      :course-id="`${feedbackFormDetails.course.id}`"
    ></panel-page-title>
    <panel-page-title
      v-if="!viewMode"
      :title="`${
        $route.query.feedbackId ? 'עריכת חוות הדעת על' : 'הוספת חוות דעת על'
      } ${feedbackFormDetails.course.name}`"
      :course-id="`${feedbackFormDetails.course.id}`"
    ></panel-page-title>
    <div v-if="canEdit" class="flex flex-row">
      <nuxt-link
        v-if="viewMode"
        tag="button"
        :to="`/feedback/${$route.params.id}?feedbackId=${$route.query.feedbackId}&edit=1`"
        class="button blue-button ml-2"
      >
        ערוך ביקורת
      </nuxt-link>
      <button class="button red-button" @click="deleteFeedback">
        מחק ביקורת
      </button>
    </div>
    <div v-if="!viewMode" class="grid grid-cols-2 gap-4">
      <h2 class="col-span-2">סגל הקורס</h2>
      <label for="selectedLecturer">מרצה:</label>
      <multiselect
        id="selectedLecturer"
        v-model="selectedLecturer"
        :options="lecturersList"
        :searchable="false"
        :show-labels="false"
        label="label"
        track-by="id"
      />
      <label for="selectedteachingAssistant">מתרגל/ת:</label>
      <multiselect
        id="selectedteachingAssistant"
        v-model="selectedTeachingAssistant"
        :options="teachingAssistantsList"
        :searchable="false"
        :show-labels="false"
        label="label"
        track-by="id"
      />
    </div>
    <div>
      <h2>שאלות כלליות</h2>
      <div
        v-for="question in generalQuestions"
        :key="question.id"
        class="items-baseline"
      >
        <div class="grid grid-cols-2 gap-2">
          <div class="text-lg mb-2">
            {{ question.question }}
          </div>
          <div class="text-lg mb-2">
            <rating
              :editable="!viewMode"
              :rating="question.id in ratings ? ratings[question.id] : 0"
              @rating-set="ratingSet(question.id, $event)"
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
          class="form-field h-24"
          :disabled="viewMode"
        ></textarea>
      </div>
    </div>
    <div class="paragraph-comp">
      <h2>שאלות מרצה</h2>
      <div
        v-for="question in lecturerQuestions"
        :key="question.id"
        class="items-center"
      >
        <div
          class="grid grid-cols-2 gap-2 border-b border-input-border border-solid py-2"
        >
          <div class="text-lg mb-2">
            {{ question.question }}
          </div>
          <div class="text-lg mb-2 flex items-center">
            <rating
              :editable="!viewMode"
              :rating="question.id in ratings ? ratings[question.id] : 0"
              @rating-set="ratingSet(question.id, $event)"
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
          class="form-field h-24"
          :disabled="viewMode"
        ></textarea>
      </div>
    </div>
    <div>
      <h2>שאלות מתרגל</h2>
      <div
        v-for="question in taQuestions"
        :key="question.id"
        class="items-baseline"
      >
        <div class="grid grid-cols-2 gap-2">
          <div class="text-lg mb-2">
            {{ question.question }}
          </div>
          <div class="text-lg mb-2">
            <rating
              :editable="!viewMode"
              :rating="question.id in ratings ? ratings[question.id] : 0"
              @rating-set="ratingSet(question.id, $event)"
            />
          </div>
        </div>
      </div>
      <div class="grid grid-rows gap-2">
        <label for="taFreeContent" class="font-bold">מלל חופשי</label>
        <textarea
          id="taFreeContent"
          v-model="taFreeContent"
          placeholder="מלל חופשי על מתרגלי הקורס..."
          rows="5"
          class="form-field h-24"
          :disabled="viewMode"
        ></textarea>
      </div>
    </div>
    <div v-if="!viewMode" class="mt-2">
      <button class="button blue-button" @click="onSubmit">
        {{ $route.query.feedbackId ? 'שמור ביקורת' : 'הוסף ביקורת' }}
      </button>
    </div>
    <div v-if="viewMode" class="flex justify-center pt-4">
      <div class="flex">
        <button class="button red-button" @click="toggleDislike">
          <font-awesome-icon
            :icon="[disliked ? 'fas' : 'far', 'thumbs-down']"
          />
          לא אהבתי
        </button>
        <div class="mr-4 mt-2">{{ dislikes }}</div>
      </div>
      <div class="flex mr-16">
        <button class="button green-button" @click="toggleLike">
          <font-awesome-icon :icon="[liked ? 'fas' : 'far', 'thumbs-up']" />
          אהבתי
        </button>
        <div class="mr-4 mt-2">{{ likes }}</div>
      </div>
    </div>
    <div v-if="viewMode">
      <comments
        :comments="comments"
        :user-feedback-id="$route.query.feedbackId"
        @commented="updateComment"
        @new-comment="newComment"
      ></comments>
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
import Multiselect from 'vue-multiselect'
import feedbackFormDetails from '@/gql/feedbackFormDetails.gql'
import userFeedback from '@/gql/userFeedback.gql'
import addUserFeedback from '@/gql/addUserFeedback.gql'
import editUserFeedback from '@/gql/editUserFeedback.gql'
import deleteUserFeedback from '@/gql/deleteUserFeedback.gql'
import likeUserFeedback from '@/gql/likeUserFeedback.gql'
import dislikeUserFeedback from '@/gql/dislikeUserFeedback.gql'
import { showSuccessToast, staffToString } from '@/utils'
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      generalFreeContent: '',
      lecturerFreeContent: '',
      taFreeContent: '',
      comments: [],
      loading: false,
      feedbackFormDetails: {
        course: {
          name: '',
        },
        feedbackformcoursesemesterSet: {
          edges: [],
        },
      },
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
      ratings: {},
      selectedLecturer: null,
      selectedTeachingAssistant: null,
      canEdit: false,
    }
  },
  computed: {
    viewMode() {
      return !this.$route.query.edit
    },
    generalQuestions() {
      const gqList = []
      if (
        this.feedbackFormDetails.feedbackformcoursesemesterSet.edges.length ===
        0
      ) {
        return []
      }
      for (const item of this.feedbackFormDetails.feedbackformcoursesemesterSet
        .edges[0].node.feedbackForm.questions.edges) {
        if (item.node.classification === 'A_3') {
          gqList.push(item.node)
        }
      }
      return gqList
    },
    lecturerQuestions() {
      const lqList = []
      if (
        this.feedbackFormDetails.feedbackformcoursesemesterSet.edges.length ===
        0
      ) {
        return []
      }
      for (const item of this.feedbackFormDetails.feedbackformcoursesemesterSet
        .edges[0].node.feedbackForm.questions.edges) {
        if (item.node.classification === 'A_1') {
          lqList.push(item.node)
        }
      }
      return lqList
    },
    taQuestions() {
      const tqList = []
      if (
        this.feedbackFormDetails.feedbackformcoursesemesterSet.edges.length ===
        0
      ) {
        return []
      }
      for (const item of this.feedbackFormDetails.feedbackformcoursesemesterSet
        .edges[0].node.feedbackForm.questions.edges) {
        if (item.node.classification === 'A_2') {
          tqList.push(item.node)
        }
      }
      return tqList
    },
    lecturersList() {
      if (!('coursesemesterstaffSet' in this.feedbackFormDetails)) {
        return []
      }
      return this.feedbackFormDetails.coursesemesterstaffSet.edges[0].node.lecturers.edges.map(
        ({ node }) => ({
          ...node,
          label: staffToString(node),
        })
      )
    },
    teachingAssistantsList() {
      if (!('coursesemesterstaffSet' in this.feedbackFormDetails)) {
        return []
      }
      return this.feedbackFormDetails.coursesemesterstaffSet.edges[0].node.teachingAssistants.edges.map(
        ({ node }) => ({
          ...node,
          label: staffToString(node),
        })
      )
    },
    ...mapGetters({
      fullPermissions: 'user_data/fullPermissions',
    }),
  },
  watch: {
    lecturersList(oldVal, newVal) {
      this.selectedLecturer = this.lecturersList[0]
    },
    teachingAssistantsList(oldVal, newVal) {
      this.selectedTeachingAssistant = this.teachingAssistantsList[0]
    },
  },
  created() {
    if (this.$route.query.feedbackId) {
      this.$apollo
        .query({
          query: userFeedback,
          variables: {
            id: this.$route.query.feedbackId,
          },
          fetchPolicy: 'no-cache',
        })
        .then((response) => {
          const serverData = response.data.userFeedback
          this.generalFreeContent = serverData.generalFeedback
          this.lecturerFreeContent = serverData.lecturerFeedback
          this.taFreeContent = serverData.teachingAssistantFeedback
          this.likes = serverData.likesCount
          this.dislikes = serverData.dislikesCount
          this.liked = serverData.liked
          this.disliked = serverData.disliked
          this.comments = serverData.commentSet.edges
          serverData.questionuserfeedbackSet.edges.forEach(({ node }) => {
            Vue.set(this.ratings, node.question.id, node.ranking)
          })
          this.canEdit = serverData.myFeedback || this.fullPermissions
        })
    }
  },
  methods: {
    async onSubmit() {
      await this.$apollo.mutate({
        mutation: this.$route.query.feedbackId
          ? editUserFeedback
          : addUserFeedback,
        variables: {
          input: {
            ...(this.$route.query.feedbackId
              ? {
                  userFeedbackId: this.$route.query.feedbackId,
                }
              : {
                  feedbackFormId: this.feedbackFormDetails
                    .feedbackformcoursesemesterSet.edges[0].node.feedbackForm
                    .id,
                  courseSemesterId: this.$route.params.id,
                }),
            lecturerId: this.selectedLecturer.id,
            teachingAssistantId: this.selectedTeachingAssistant
              ? this.selectedTeachingAssistant.id
              : undefined,
            questionRatings: Object.keys(this.ratings).map((key) => ({
              questionId: key,
              rating: this.ratings[key],
            })),
            lecturerFeedback: this.lecturerFreeContent,
            teachingAssistantFeedback: this.taFreeContent,
            generalFeedback: this.generalFreeContent,
          },
        },
      })
      showSuccessToast(
        this,
        this.$route.query.feedbackId
          ? 'ביקורת נערכה בהצלחה!'
          : 'ביקורת נוספה בהצלחה!',
        `/course/${this.feedbackFormDetails.course.id}`
      )
    },
    toggleShown(index) {
      this.isShown[index].value = !this.isShown[index].value
    },
    updateComment(comment) {
      this.comments.push(comment)
    },
    async toggleLike() {
      await this.$apollo.mutate({
        mutation: likeUserFeedback,
        variables: {
          id: this.$route.query.feedbackId,
        },
      })
      showSuccessToast(
        this,
        this.liked ? 'לייק הוסר בהצלחה' : 'לייק נוסף בהצלחה',
        null,
        () => {
          if (this.disliked) {
            this.disliked = false
            this.dislikes--
          }
          this.liked = !this.liked
          if (this.liked) {
            this.likes++
          } else {
            this.likes--
          }
        }
      )
    },
    async toggleDislike() {
      await this.$apollo.mutate({
        mutation: dislikeUserFeedback,
        variables: {
          id: this.$route.query.feedbackId,
        },
      })
      showSuccessToast(
        this,
        this.disliked ? 'דיסלייק הוסר בהצלחה' : 'דיסלייק נוסף בהצלחה',
        null,
        () => {
          if (this.liked) {
            this.liked = false
            this.likes--
          }
          this.disliked = !this.disliked
          if (this.disliked) {
            this.dislikes++
          } else {
            this.dislikes--
          }
        }
      )
    },
    newComment(comment) {
      this.comments.push(comment)
    },
    ratingSet(questionId, rating) {
      Vue.set(this.ratings, questionId, rating)
    },
    async deleteFeedback() {
      await this.$apollo.mutate({
        mutation: deleteUserFeedback,
        variables: {
          id: this.$route.query.feedbackId,
        },
      })
      showSuccessToast(
        this,
        'הביקורת נמחקה בהצלחה',
        `/course/${this.feedbackFormDetails.course.id}`
      )
    },
  },
  apollo: {
    feedbackFormDetails: {
      query: feedbackFormDetails,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      update: (data) => data.courseSemesterDetails,
    },
  },
}
</script>
