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
      <div class="items-baseline">
        <strong>מרצה:</strong>
        <span>{{
          multipleStaffToString(
            edge.node.coursesemesterstaffSet.edges[0].node.lecturers.edges
          )
        }}</span>
      </div>
      <div class="items-baseline">
        <strong>מתרגל/ת:</strong>
        <span>{{
          multipleStaffToString(
            edge.node.coursesemesterstaffSet.edges[0].node.teachingAssistants
              .edges
          )
        }}</span>
      </div>
      <div class="items-baseline justify-between md:justify-start">
        <strong>דירוג מרצה:</strong>
        <span>
          <rating
            :rating="edge.node.averageLecturerRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div class="items-baseline justify-between md:justify-start">
        <strong>דירוג מתרגל/ת:</strong>
        <span>
          <rating
            :rating="edge.node.averageTeachingAssistantRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div class="items-baseline justify-between md:justify-start">
        <strong>דירוג קורס:</strong>
        <span>
          <rating
            :rating="edge.node.averageCourseRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div class="items-baseline justify-between md:justify-start">
        <strong>דירוג קורס + מרצה:</strong>
        <span>
          <rating
            :rating="edge.node.averageCourseAndLecturerRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div class="items-baseline justify-between md:justify-start">
        <strong>דירוג קורס + מתרגל/ת:</strong>
        <span>
          <rating
            :rating="edge.node.averageCourseAndTeachingAssistantRating"
            class="rating"
          ></rating>
        </span>
      </div>
      <div class="items-center">
        <button
          v-if="!edge.node.inMyCourses"
          class="button blue-button ml-2 h-full md:h-auto"
          @click="addToMyCourses(edge.node)"
        >
          הוסף לקורסים שלי
        </button>
        <button
          v-else
          class="button blue-button ml-2 h-full md:h-auto"
          @click="removeFromMyCourses(edge.node)"
        >
          הסר מהקורסים שלי
        </button>
        <button
          class="button blue-button h-full md:h-auto"
          :class="{ 'ml-2': isAdmin }"
        >
          הוסף חוות דעת
        </button>
        <nuxt-link
          v-if="isAdmin"
          :to="`/admin/course_semester/${edge.node.id}`"
          tag="button"
          class="button blue-button h-full ml-2"
        >
          ערוך קורס בסמסטר
        </nuxt-link>
        <button
          class="button red-button h-full"
          @click="deleteCourseSemester(edge.node, index)"
        >
          מחק קורס בסמסטר
        </button>
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
    }),
  },
  methods: {
    multipleStaffToString,
    getSemester,
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
div.grid div {
  @apply flex;
  @apply flex-row;
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
