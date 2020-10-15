<template>
  <div>
    <labeled-box-card
      v-for="(edge, index) in data"
      :key="edge.node.id"
      :title="'סמסטר ' + getSemester(edge.node.semester)"
      :is-shown="showIndices.includes(index)"
      body-class="grid gap-1 grid-cols-2 gap-y-3 border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
      @toggle-shown="triggerToggleShown(index)"
    >
      <div class="items-baseline flex-row">
        <strong>מרצה:</strong>
        <ul class="list-disc pr-5">
          <li
            v-for="staffEdge in edge.node.coursesemesterstaffSet.edges[0].node
              .lecturers.edges"
            :key="staffEdge.node.id"
          >
            <nuxt-link
              :to="`/staff/${staffEdge.node.id}`"
              class="underline text-primary hover:text-primary-hover"
            >
              {{ staffToString(staffEdge.node) }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="items-baseline flex-row">
        <strong>מתרגל/ת:</strong>
        <ul class="list-disc pr-5">
          <li
            v-for="staffEdge in edge.node.coursesemesterstaffSet.edges[0].node
              .teachingAssistants.edges"
            :key="staffEdge.node.id"
          >
            <nuxt-link
              :to="`/staff/${staffEdge.node.id}`"
              class="underline text-primary hover:text-primary-hover"
            >
              {{ staffToString(staffEdge.node) }}
            </nuxt-link>
          </li>
        </ul>
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
        :class="{
          'md:col-span-2': edge.node.coursesemesterexamSet.edges.length === 0,
        }"
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
        class="col-span-2 items-start justify-items-stretch flex flex-col"
      >
        <strong>התפלגות ציונים:</strong>
        <button class="button blue-button" @click="toggleHistogram(index)">
          {{
            histogramShown.includes(index)
              ? 'הסתר התפלגות ציונים'
              : 'הצג התפלגות ציונים'
          }}
        </button>
        <bar-chart
          v-if="histogramShown.includes(index)"
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
        <button
          class="button blue-button mb-2 md:mb-0 md:ml-2 h-full"
          @click="toggleHistogramAddShown(index)"
        >
          הוסף ציוני מבחן
        </button>
        <nuxt-link
          v-if="edge.node.feedbackformcoursesemesterSet.edges.length > 0"
          class="button blue-button h-full mb-2 md:mb-0 md:ml-2"
          :to="
            edge.node.wroteFeedback
              ? `/feedback/${edge.node.id}?edit=1&feedbackId=${edge.node.feedbackId}`
              : `/feedback/${edge.node.id}?edit=1`
          "
          tag="button"
        >
          {{ edge.node.wroteFeedback ? 'ערוך חוות דעת' : 'הוסף חוות דעת' }}
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
          :course-semester-id="edge.node.id"
          :feedbacks="edge.node.userfeedbackSet"
        ></feedback-preview>
      </div>
      <form
        v-if="histogramAddShown.includes(index)"
        class="col-span-2 items-baseline grid grid-cols-2 gap-2"
      >
        <label :for="`moed_${index}`">מועד:</label>
        <input-field
          :id="`moed_${index}`"
          v-model="addGrades[index].moed"
          label="מועד"
          type="text"
        ></input-field>
        <label :for="`average_${index}`">ממוצע:</label>
        <input-field
          :id="`average_${index}`"
          v-model="addGrades[index].average"
          label="ממוצע"
          type="number"
        ></input-field>
        <label :for="`histogram_${index}`">התפלגות:</label>
        <div :id="`histogram_${index}`">
          <div
            v-for="i in 10"
            :key="`histogram_${index}_bin_${i}`"
            class="flex flex-col items-right rounded-lg border-input-border border border-solid mb-2 p-2 text-right"
            dir="ltr"
          >
            <label :for="`histogram_${index}_bin_${i}_input`">
              {{ histogramMapping[i - 1] }}:
            </label>
            <input-field
              :id="`histogram_${index}_bin_${i}_input`"
              v-model.number="addGrades[index].histogram[i - 1]"
              type="number"
              :label="histogramMapping[i - 1]"
            ></input-field>
          </div>
          <button
            class="button blue-button"
            @click.prevent="sendHistogram(index)"
          >
            {{ isAdmin ? 'הוסף ציוני מבחן' : 'שלח ציוני מבחן לאישור' }}
          </button>
        </div>
      </form>
    </labeled-box-card>
  </div>
</template>

<script>
import {
  multipleStaffToString,
  staffToString,
  getSemester,
  showSuccessToast,
} from '@/utils'
import addCourseToMyCourses from '@/gql/addCourseToMyCourses.gql'
import removeFromMyCourses from '@/gql/removeFromMyCourses.gql'
import deleteCourseInSemester from '@/gql/deleteCourseInSemester.gql'
import addGrades from '@/gql/addGrades.gql'
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
      showIndices: [],
      histogramShown: [],
      histogramAddShown: [],
      addGrades: {},
      histogramMapping: [
        '0-10',
        '11-20',
        '21-30',
        '31-40',
        '41-50',
        '51-60',
        '61-70',
        '71-80',
        '81-90',
        '91+',
      ],
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'user_data/isAdmin',
      isLoggedIn: 'user_data/isLoggedIn',
    }),
  },
  created() {
    this.showIndices = this.data
      .map((item, index) => [index, item.isShown])
      .filter((value) => value[1])
      .map((item) => item[0])
  },
  methods: {
    multipleStaffToString,
    staffToString,
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
      const shownIndex = this.showIndices.indexOf(index)
      if (shownIndex === -1) {
        this.showIndices.push(index)
      } else {
        this.showIndices.splice(shownIndex, 1)
      }
    },
    async addToMyCourses(node) {
      await this.$apollo.mutate({
        mutation: addCourseToMyCourses,
        variables: {
          id: node.id,
        },
      })
      node.inMyCourses = true
      showSuccessToast(this, 'נוסף לקורסים שלי', null)
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
      showSuccessToast(this, 'הוסר מהקורסים שלי', null)
      this.$forceUpdate()
    },
    async deleteCourseSemester(node, index) {
      await this.$apollo.mutate({
        mutation: deleteCourseInSemester,
        variables: {
          id: node.id,
        },
      })
      showSuccessToast(this, 'נמחק בהצלחה', '/')
      this.$emit('delete-course-semester', index)
    },
    toggleHistogram(index) {
      const shownIndex = this.histogramShown.indexOf(index)
      if (shownIndex === -1) {
        this.histogramShown.push(index)
      } else {
        this.histogramShown.splice(shownIndex, 1)
      }
    },
    toggleHistogramAddShown(index) {
      const shownIndex = this.histogramAddShown.indexOf(index)
      if (shownIndex === -1) {
        this.histogramAddShown.push(index)
        this.addGrades[index] = {
          moed: '',
          average: 0.0,
          histogram: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
      } else {
        this.histogramAddShown.splice(shownIndex, 1)
        delete this.addGrades[index]
      }
    },
    async sendHistogram(index) {
      await this.$apollo.mutate({
        mutation: addGrades,
        variables: {
          input: {
            courseSemesterId: this.data[index].node.id,
            ...this.addGrades[index],
          },
        },
      })
      showSuccessToast(
        this,
        'נשלח בהצלחה. יתכן שיידרש אישור מנהל',
        null,
        () => {
          this.toggleHistogramAddShown(index)
          this.$router.go()
        }
      )
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
