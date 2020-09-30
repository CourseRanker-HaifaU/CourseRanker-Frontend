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
          class="button blue-button ml-2 h-full md:h-auto"
          @click="addToMyCourses(edge.node.id)"
        >
          הוסף לקורסים שלי
        </button>
        <button class="button blue-button h-full md:h-auto">
          הוסף חוות דעת
        </button>
      </div>
    </labeled-box-card>
  </div>
</template>

<script>
import { multipleStaffToString, getSemester } from '@/utils'
import addCourseToMyCourses from '@/gql/addCourseToMyCourses.gql'

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
  methods: {
    multipleStaffToString,
    getSemester,
    triggerToggleShown(index) {
      this.$emit('toggle-shown', index)
    },
    async addToMyCourses(id) {
      await this.$apollo.mutate({
        mutation: addCourseToMyCourses,
        variables: {
          id,
        },
      })
      alert('נוסף בהצלחה!')
      this.$forceUpdate()
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
