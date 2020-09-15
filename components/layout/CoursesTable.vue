<template>
  <div class="frame-div flex flex-col w-full items-stretch justify-start">
    <div v-if="isSmall" class="courses-cards">
      <div
        v-for="course in courses"
        :key="course.id"
        class="course-card"
        @click="sendTo(`/course/${course.id}`)"
      >
        <div>
          <strong>שם קורס:</strong>
          {{ course.name }}
        </div>
        <div>
          <strong>סמסטר:</strong>
          {{ course.semester }}
        </div>
        <div>
          <strong>מרצה:</strong>
          {{ course.lecturer }}
        </div>
        <div>
          <strong>מתרגל/ת:</strong>
          {{ course.teachingAssistant }}
        </div>
        <div>
          <strong>חוות דעת קורס:</strong>
          <rating v-if="whichTable === 'courses'" :rating="5" />
          <button v-if="whichTable !== 'courses'" class="button button-blue">
            הוספת חוות דעת
          </button>
        </div>
        <div>
          <strong>חוות דעת מרצה:</strong>
          <rating v-if="whichTable === 'courses'" :rating="4" />
          <button v-if="whichTable !== 'courses'" class="button button-blue">
            הוספת חוות דעת
          </button>
        </div>
        <div>
          <strong>חוות דעת מתרגל/ת:</strong>
          <rating v-if="whichTable === 'courses'" :rating="5" />
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
          <th class="td-style">מרצה</th>
          <th class="td-style">מתרגל/ת</th>
          <th v-if="whichTable != 'myCourses'" class="td-style">
            חוות דעת קורס
          </th>
          <th v-if="whichTable != 'myCourses'" class="td-style">
            חוות דעת מרצה
          </th>
          <th v-if="whichTable != 'myCourses'" class="td-style">
            חוות דעת מתרגל/ת
          </th>
          <th v-if="whichTable === 'myCourses'" class="td-style">
            מחק מהקורסים שלי
          </th>
        </tr>
      </thead>

      <tr
        v-for="course in courses"
        :key="course.id"
        class="cursor-pointer border-b border-black text-right hover:bg-gray-200"
        @click="sendTo(`/course/${course.id}`)"
      >
        <!-------------------- 1st col -------------------->
        <td
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          {{ course.name }}
        </td>

        <!-------------------- 2nd col -------------------->
        <td
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          {{ course.semester }}
        </td>

        <!-------------------- 3rd col -------------------->
        <td
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          {{ course.lecturer }}
        </td>

        <!-------------------- 4rd col -------------------->
        <td
          :class="[whichTable === 'myCourses' ? 'td-my-courses' : 'td-style']"
        >
          {{ course.teachingAssistant }}
        </td>

        <!-------------------- 5th col-optional -------------------->
        <td v-if="whichTable != 'myCourses'" class="td-style">
          <!-- Will later show actual rating -->
          <rating v-if="whichTable === 'courses'" :rating="5"></rating>
          <button v-if="whichTable === 'feedback'" class="table-btn">
            הוספת חוות דעת
          </button>
        </td>

        <!-------------------- 6th col-optional -------------------->
        <td v-if="whichTable != 'myCourses'" class="td-style">
          <!-- Will later show actual rating -->
          <rating v-if="whichTable === 'courses'" :rating="4"></rating>
          <button v-if="whichTable === 'feedback'" class="table-btn">
            הוספת חוות דעת
          </button>
        </td>

        <!-------------------- 7th col-optional -------------------->
        <td v-if="whichTable != 'myCourses'" class="'td-style'">
          <!-- Will later show actual rating -->
          <rating v-if="whichTable === 'courses'" :rating="5"></rating>
          <button v-if="whichTable === 'feedback'" class="table-btn">
            הוספת חוות דעת
          </button>
        </td>

        <!-------------------- 8th col-optional -------------------->
        <!-- If table is shown as part of "my_courses.vue" -->
        <td v-if="whichTable === 'myCourses'" class="td-my-courses">
          <button class="table-btn">מחק קורס</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    whichTable: {
      /* in "index.vue" -> courses,
         in  "my_courses.vue" -> myCourses, feedback */
      type: String,
      default() {
        return { whichTable: 'courses' }
      },
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      courses: [
        {
          id: 1,
          name: 'מבוא למדעי המחשב',
          semester: 'א\' תשפ"א',
          lecturer: "פרופ' שולי וינטנר",
          teachingAssistant: 'דניאל מובסוביץ',
        },
        {
          id: 2,
          name: 'מתמטיקה דיסקרטית',
          semester: 'א\' תשפ"א',
          lecturer: 'ד"ר אור מאיר',
          teachingAssistant: 'קופל דפנה',
        },
        {
          id: 3,
          name: 'חדו״א 1',
          semester: 'א\' תשפ"א',
          lecturer: "פרופ' דניאל קרן",
          teachingAssistant: 'רועי וליץ',
        },
        {
          id: 4,
          name: 'אלגברה לינארית',
          semester: 'א\' תשפ"א',
          lecturer: 'ד"ר אוריה פירסט',
          teachingAssistant: 'יולי עזרא',
        },
      ],
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
