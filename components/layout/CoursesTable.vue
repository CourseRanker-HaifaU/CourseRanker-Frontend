<template>
  <div class="frame-div flex flex-col w-full items-stretch justify-start">
    <div v-if="isSmall" class="courses-cards">
      <div
        v-for="listItem in courseList.dataArray"
        :key="listItem.id"
        class="responsive-card hover:bg-secondary-hover"
        :class="{ 'cursor-pointer': whichTable !== 'myCourses' }"
        @click="
          whichTable !== 'myCourses'
            ? sendTo(`/course/${listItem.course.id}`)
            : null
        "
      >
        <div>
          <strong>שם קורס:</strong>
          <nuxt-link
            v-if="whichTable === 'myCourses'"
            :to="`/course/${listItem.course.id}`"
            >{{ listItem.course.name }}
          </nuxt-link>
          <span v-if="whichTable !== 'myCourses'">
            {{ listItem.course.name }}
          </span>
        </div>
        <div>
          <strong>סמסטר:</strong>
          {{ getSemester(listItem.semester) }}
        </div>
        <div v-if="!isLecturer" class="text-right">
          <strong>מרצה:</strong>
          {{
            multipleStaffToString(
              listItem.coursesemesterstaffSet.edges[0].node.lecturers.edges
            )
          }}
        </div>
        <div v-if="!isAssist" class="text-right">
          <strong>מתרגל/ת:</strong>
          {{
            multipleStaffToString(
              listItem.coursesemesterstaffSet.edges[0].node.teachingAssistants
                .edges
            )
          }}
        </div>
        <div v-if="whichTable !== 'myCourses'">
          <strong>חוות דעת קורס:</strong>
          <rating
            v-if="whichTable === 'courses'"
            :rating="listItem.averageCourseRating"
          />
          <button v-if="whichTable !== 'courses'" class="button button-blue">
            הוספת חוות דעת
          </button>
        </div>
        <div v-if="whichTable !== 'myCourses'">
          <strong>חוות דעת מרצה:</strong>
          <rating :rating="listItem.averageLecturerRating" />
          <button v-if="whichTable !== 'courses'" class="button button-blue">
            הוספת חוות דעת
          </button>
        </div>
        <div v-if="whichTable !== 'myCourses'">
          <strong>חוות דעת מתרגל/ת:</strong>
          <rating :rating="listItem.averageTeachingAssistantRating" />
          <button v-if="whichTable !== 'courses'" class="button button-blue">
            הוספת חוות דעת
          </button>
        </div>
        <div
          v-if="whichTable === 'myCourses' && !isLecturer && !isAssist"
          class="col-span-2"
        >
          <button class="table-btn" @click.prevent="removeCourse(listItem.id)">
            מחק קורס
          </button>
          <nuxt-link
            v-if="listItem.feedbackformSet.edges.length > 0"
            tag="button"
            class="button mr-2"
            :class="{
              'blue-button': listItem.wroteFeedback,
              'green-button': !listItem.wroteFeedback,
            }"
            :to="`/feedback/${listItem.id}?feedbackId=${
              listItem.feedbackformSet.edges[0].node.id
            }${
              listItem.wroteFeedback
                ? `&edit=1&userFeedbackId=${listItem.feedbackId}`
                : ''
            }`"
          >
            {{ listItem.wroteFeedback ? 'ערוך חוות דעת' : 'הוסף חוות דעת' }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <table v-if="!isSmall" class="lg:w-full text-right min-w-full">
      <thead>
        <tr class="border-b-2 border-black">
          <th class="td-style">שם קורס</th>
          <th class="td-style">סמסטר</th>
          <th v-if="!isLecturer" class="td-style">מרצה</th>
          <th v-if="!isAssist" class="td-style">מתרגל/ת</th>
          <th v-if="whichTable != 'myCourses'" class="td-style">
            חוות דעת קורס
          </th>
          <th v-if="whichTable != 'myCourses' || isLecturer" class="td-style">
            חוות דעת מרצה
          </th>
          <th v-if="whichTable != 'myCourses' || isAssist" class="td-style">
            חוות דעת מתרגל/ת
          </th>
          <th
            v-if="whichTable === 'myCourses' && !isLecturer && !isAssist"
            class="td-style"
          >
            פעולות
          </th>
        </tr>
      </thead>

      <tr
        v-for="listItem in courseList.dataArray"
        :key="listItem.id"
        class="border-b border-black text-right hover:bg-gray-200"
        :class="{ 'cursor-pointer': whichTable !== 'myCourses' }"
        @click="
          whichTable !== 'myCourses'
            ? sendTo(`/course/${listItem.course.id}`)
            : null
        "
      >
        <!-------------------- 1st col -------------------->
        <td
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          <nuxt-link
            v-if="whichTable === 'myCourses'"
            :to="`/course/${listItem.course.id}`"
            >{{ listItem.course.name }}
          </nuxt-link>
          <span v-if="whichTable !== 'myCourses'">
            {{ listItem.course.name }}
          </span>
        </td>

        <!-------------------- 2nd col -------------------->
        <td
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          {{ getSemester(listItem.semester) }}
        </td>

        <!-------------------- 3rd col -------------------->
        <td
          v-if="!isLecturer"
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          {{
            multipleStaffToString(
              listItem.coursesemesterstaffSet.edges[0].node.lecturers.edges
            )
          }}
        </td>

        <!-------------------- 4rd col -------------------->
        <td
          v-if="!isAssist"
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          {{
            multipleStaffToString(
              listItem.coursesemesterstaffSet.edges[0].node.teachingAssistants
                .edges
            )
          }}
        </td>

        <!-------------------- 5th col-optional -------------------->
        <td v-if="whichTable != 'myCourses'" class="td-style">
          <rating
            v-if="whichTable === 'courses'"
            :rating="listItem.averageCourseRating"
          ></rating>
          <button v-if="whichTable === 'feedback'" class="table-btn">
            הוספת חוות דעת
          </button>
        </td>

        <!-------------------- 6th col-optional -------------------->
        <td v-if="whichTable != 'myCourses' || isLecturer" class="td-style">
          <rating
            v-if="whichTable === 'courses' || isLecturer"
            :rating="listItem.averageLecturerRating"
          ></rating>
          <button v-if="whichTable === 'feedback'" class="table-btn">
            הוספת חוות דעת
          </button>
        </td>

        <!-------------------- 7th col-optional -------------------->
        <td v-if="whichTable != 'myCourses' || isAssist" class="'td-style'">
          <rating
            v-if="whichTable === 'courses' || isAssist"
            :rating="listItem.averageTeachingAssistantRating"
          ></rating>
          <button v-if="whichTable === 'feedback'" class="table-btn">
            הוספת חוות דעת
          </button>
        </td>

        <!-------------------- 8th col-optional -------------------->
        <!-- If table is shown as part of "my_courses.vue" -->
        <td
          v-if="whichTable === 'myCourses' && !isLecturer && !isAssist"
          class="td-my-courses"
        >
          <button
            class="table-btn min-w-full xxl:min-w-0"
            @click.prevent="removeCourse(listItem.id)"
          >
            מחק קורס
          </button>
          <nuxt-link
            v-if="listItem.feedbackformSet.edges.length > 0"
            tag="button"
            class="button mt-2 min-w-full xxl:min-w-0 xxl:mt-0 xxl:mr-2"
            :class="{
              'blue-button': listItem.wroteFeedback,
              'green-button': !listItem.wroteFeedback,
            }"
            :to="`/feedback/${listItem.id}?feedbackId=${
              listItem.feedbackformSet.edges[0].node.id
            }${
              listItem.wroteFeedback
                ? `&edit=1&userFeedbackId=${listItem.feedbackId}`
                : ''
            }`"
          >
            {{ listItem.wroteFeedback ? 'ערוך חוות דעת' : 'הוסף חוות דעת' }}
          </nuxt-link>
        </td>
      </tr>
    </table>
    <infinite-loading v-if="!isLoading" @infinite="infiniteHandler">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
import SmallWidthMixin from '@/mixins/small_width'
import { multipleStaffToString, getSemester, showSuccessToast } from '@/utils'
import removeFromMyCourses from '@/gql/removeFromMyCourses.gql'
import { mapMutations } from 'vuex'

export default {
  mixins: [SmallWidthMixin],
  props: {
    whichTable: {
      /* in "index.vue" -> courses,
         in  "my_courses.vue" -> myCourses, feedback
         in "staff_page.vue" -> myCourses */
      type: String,
      default() {
        return { whichTable: 'courses' }
      },
    },
    isLecturer: {
      type: Boolean,
      default: false,
    },
    isAssist: {
      type: Boolean,
      default: false,
    },
    keywords: {
      type: String,
      default: '',
    },
    courseList: {
      type: Object,
      default() {
        return { dataArray: [] }
      },
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    infiniteHandler: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      rowsPerPage: 10,
      after: '',
      endCursor: '',
      hasNextPage: false,
    }
  },
  methods: {
    ...mapMutations({
      changeKeywords: 'search/changeKeywords',
    }),
    sendTo(msg) {
      this.changeKeywords('')
      this.$router.push(msg)
    },
    getSemester,
    multipleStaffToString,
    async removeCourse(id) {
      await this.$apollo.mutate({
        mutation: removeFromMyCourses,
        variables: {
          id,
        },
      })
      const toRemove = this.courseList.dataArray.findIndex(
        (item) => item.id === id
      )
      showSuccessToast(this, 'הוסר בהצלחה', '/user/courses')
      this.$emit('remove-row', toRemove)
    },
  },
}
</script>

<style scoped>
.td-style {
  @apply py-4;
  @apply px-1;
  @apply mx-0;
  @apply text-xs;
  @apply align-middle;
}

.td-my-courses {
  @apply w-1/5;
  @apply py-4;
  @apply mx-0;
  @apply font-normal;
}
@screen md {
  .td-style {
    @apply text-sm;
    @apply mx-2;
  }
}
@screen lg {
  .td-style {
    @apply mx-4;
  }
}
.table-btn {
  @apply text-white;
  @apply bg-primary;
  @apply p-2;
  @apply rounded;
}
.table-btn:active {
  @apply outline-none;
}
</style>
