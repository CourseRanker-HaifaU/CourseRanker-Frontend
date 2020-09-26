<template>
  <div class="frame-div flex flex-col w-full items-stretch justify-start">
    <div v-if="isSmall" class="courses-cards">
      <div
        v-for="listItem in courseList"
        :key="listItem.id"
        class="course-card"
        @click="sendTo(`/course/${listItem.course.id}`)"
      >
        <div>
          <strong>שם קורס:</strong>
          {{ listItem.course.name }}
        </div>
        <div>
          <strong>סמסטר:</strong>
          {{ getSemester(listItem.semester) }}
        </div>
        <div v-if="!isLecturer">
          <strong>מרצה:</strong>
          {{
            multipleStaffToString(
              listItem.coursesemesterstaffSet.edges[0].node.lecturers.edges
            )
          }}
        </div>
        <div v-if="!isAssist">
          <strong>מתרגל/ת:</strong>
          {{
            multipleStaffToString(
              listItem.coursesemesterstaffSet.edges[0].node.teachingAssistants
                .edges
            )
          }}
        </div>
        <div>
          <strong>חוות דעת קורס:</strong>
          <rating
            v-if="whichTable === 'courses'"
            :rating="listItem.averageCourseRating"
          />
          <button v-if="whichTable !== 'courses'" class="button button-blue">
            הוספת חוות דעת
          </button>
        </div>
        <div>
          <strong>חוות דעת מרצה:</strong>
          <rating
            v-if="whichTable === 'courses'"
            :rating="listItem.averageLecturerRating"
          />
          <button v-if="whichTable !== 'courses'" class="button button-blue">
            הוספת חוות דעת
          </button>
        </div>
        <div>
          <strong>חוות דעת מתרגל/ת:</strong>
          <rating
            v-if="whichTable === 'courses'"
            :rating="listItem.averageTeachingAssistantRating"
          />
          <button v-if="whichTable !== 'courses'" class="button button-blue">
            הוספת חוות דעת
          </button>
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
            מחק מהקורסים שלי
          </th>
        </tr>
      </thead>

      <tr
        v-for="listItem in courseList"
        :key="listItem.id"
        class="cursor-pointer border-b border-black text-right hover:bg-gray-200"
        @click="sendTo(`/course/${listItem.course.id}`)"
      >
        <!-------------------- 1st col -------------------->
        <td
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          {{ listItem.course.name }}
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
          <button class="table-btn">מחק קורס</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import currentSemesterCourses from '@/gql/currentSemesterCourses.gql'
import { multipleStaffToString, getSemester } from '@/utils'

export default {
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
      default() {
        return { isLecturer: false }
      },
    },
    isAssist: {
      type: Boolean,
      default() {
        return { isAssist: false }
      },
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    isSmall() {
      return this.windowWidth <= 640
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  methods: {
    sendTo(msg) {
      this.$router.push(msg)
    },
    getSemester,
    multipleStaffToString,
  },
  apollo: {
    courseList: {
      query: currentSemesterCourses,
      update: (data) => {
        const allSemesters = data.allSemesters.edges
        const dataArray = []
        for (const semester of allSemesters) {
          const semesterCourses = []
          for (const course of semester.node.coursesemesterSet.edges) {
            semesterCourses.push(course.node)
          }
          dataArray.push(...semesterCourses)
        }
        return dataArray
      },
      variables: {
        keywords: '',
      },
    },
  },
}
</script>

<style scoped>
.course-card {
  @apply grid;
  @apply grid-cols-2;
  @apply gap-2;
  @apply mt-2;
  @apply border;
  @apply border-primary;
  @apply rounded;
  @apply border-solid;
  @apply p-4;
  @apply text-center;
  @apply cursor-pointer;
}

.course-card:hover {
  @apply bg-secondary-hover;
}

.course-card div {
  @apply inline-flex;
  @apply flex-row;
  @apply flex-wrap;
  @apply items-start;
  @apply self-center;
}

.course-card div strong {
  @apply ml-2;
}

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
