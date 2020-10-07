<template>
  <div>
    <labeled-box-card
      v-for="(edge, index) in data"
      :key="edge.node.id"
      :title="'סמסטר ' + getSemester(edge.node.semester)"
      :is-shown="edge.isShown"
      body-class="grid gap-1 grid-cols-2 gap-y-3 border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
      @toggle-shown="triggerToggleShown(index)"
    >
      <div class="items-baseline flex-row">
        <strong>מרצה:</strong>
        <span>{{
          multipleStaffToString(
            edge.node.coursesemesterstaffSet.edges[0].node.lecturers.edges
          )
        }}</span>
      </div>
      <div class="flex items-baseline flex-row">
        <strong>מתרגל/ת:</strong>
        <span>{{
          multipleStaffToString(
            edge.node.coursesemesterstaffSet.edges[0].node.teachingAssistants
              .edges
          )
        }}</span>
      </div>
      <div
        class="flex items-baseline flex-row justify-between md:justify-start"
      >
        <strong>דירוג מרצה:</strong>
        <span>
          <rating
            :rating="edge.node.averageLecturerRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div
        class="flex items-baseline flex-row justify-between md:justify-start"
      >
        <strong>דירוג מתרגל/ת:</strong>
        <span>
          <rating
            :rating="edge.node.averageTeachingAssistantRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div
        class="flex items-baseline flex-row justify-between md:justify-start"
      >
        <strong>דירוג קורס:</strong>
        <span>
          <rating
            :rating="edge.node.averageCourseRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div
        class="flex items-baseline flex-row justify-between md:justify-start"
      >
        <strong>דירוג קורס + מרצה:</strong>
        <span>
          <rating
            :rating="edge.node.averageCourseAndLecturerRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div
        class="flex items-baseline flex-row justify-between md:justify-start"
      >
        <strong>דירוג קורס + מתרגל/ת:</strong>
        <span>
          <rating
            :rating="edge.node.averageCourseAndTeachingAssistantRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div
        v-if="edge.node.coursesemesterexamSet.edges.length > 0"
        class="flex items-baseline flex-row justify-start"
      >
        <strong>ממוצע ציונים:</strong>
        <ul>
          <li
            v-for="examEdge in edge.node.coursesemesterexamSet.edges"
            :key="examEdge.node.id"
          >
            {{ examEdge.node.moed }}: {{ examEdge.node.average }}
          </li>
        </ul>
      </div>
      <div
        v-if="edge.node.coursesemesterexamSet.edges.length > 0"
        class="flex flex-row items-baseline justify-start col-span-2"
      >
        <strong>נבחנו:</strong>
        <ul>
          <li
            v-for="examEdge in edge.node.coursesemesterexamSet.edges"
            :key="examEdge.node.id"
          >
            {{ examEdge.node.moed }}:
            {{
              examEdge.node.histogram.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )
            }}
          </li>
        </ul>
      </div>
      <div
        v-if="edge.node.coursesemesterexamSet.edges.length > 0"
        class="col-span-2 items-start justify-items-stretch flex flex-col md:flex-row"
      >
        <strong>התפלגות ציונים:</strong>
        <bar-chart
          :exam-edges="edge.node.coursesemesterexamSet.edges"
          class="w-full md:w-3/4 lg:w-full max-w-full"
        />
      </div>
      <div
        v-if="isLoggedIn"
        class="flex flex-col items-stretch md:flex-row md:items-center"
      >
        <button
          v-if="!edge.node.inMyCourses"
          class="button blue-button mb-2 md:mb-0 md:ml-2 h-full"
          @click="addToMyCourses(edge.node)"
        >
          הוסף לקורסים שלי
        </button>
        <button
          v-else
          class="button blue-button mb-2 md:mb-0 md:ml-2 h-full"
          @click="removeFromMyCourses(edge.node)"
        >
          הסר מהקורסים שלי
        </button>
        <nuxt-link
          class="button blue-button h-full md:h-auto mb-2 md:mb-0 md:ml-2"
          :to="`/feedback/${edge.node.id}?edit=1`"
          tag="button"
        >
          הוסף חוות דעת
        </nuxt-link>
        <nuxt-link
          v-if="isAdmin"
          :to="`/admin/course_semester/${edge.node.id}`"
          tag="button"
          class="button blue-button h-full mb-2 md:mb-0 md:ml-2"
        >
          ערוך קורס בסמסטר
        </nuxt-link>
        <button
          v-if="isAdmin"
          class="button red-button h-full"
          @click="deleteCourseSemester(edge.node, index)"
        >
          מחק קורס בסמסטר
        </button>
      </div>
      <div class="flex flex-row col-span-2 items-center">
        <feedback-preview
          :avatar="avatar()"
          :course-id="edge.node.id"
          :feedbacks="edge.node.userfeedbackSet"
        ></feedback-preview>
      </div>
    </labeled-box-card>
  </div>
</template>

<script>
import { multipleStaffToString, getSemester } from '@/utils'
import addCourseToMyCourses from '@/gql/addCourseToMyCourses.gql'
import removeFromMyCourses from '@/gql/removeFromMyCourses.gql'
import deleteCourseInSemester from '@/gql/deleteCourseInSemester.gql'
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      showIndices: [0],
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'user_data/isAdmin',
      isLoggedIn: 'user_data/isLoggedIn',
    }),
  },
  methods: {
    multipleStaffToString,
    getSemester,
    randomWord() {
      const num = Math.floor(Math.random() * 10)
      const word = Math.random().toString(36).substring(num)
      return word
    },
    avatar() {
      return 'https://robohash.org/' + this.randomWord() + '?set=set2'
    },
    triggerToggleShown(index) {
      this.$emit('toggle-shown', index)
    },
    async addToMyCourses(node) {
      await this.$apollo.mutate({
        mutation: addCourseToMyCourses,
        variables: {
          id: node.id,
        },
      })
      node.inMyCourses = true
      alert('נוסף בהצלחה!')
      this.$forceUpdate()
    },
    async removeFromMyCourses(node) {
      await this.$apollo.mutate({
        mutation: removeFromMyCourses,
        variables: {
          id: node.id,
        },
      })
      node.inMyCourses = false
      alert('הוסר מהקורסים שלך')
      this.$forceUpdate()
    },
    async deleteCourseSemester(node, index) {
      await this.$apollo.mutate({
        mutation: deleteCourseInSemester,
        variables: {
          id: node.id,
        },
      })
      alert('נמחק בהצלחה')
      this.$emit('delete-course-semester', index)
    },
  },
}
</script>

<style scoped>
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
