<template>
  <div class="frame-div flex items-stretch flex-shrink w-full">
    <table class="lg:w-full text-right">
      <thead>
        <tr class="border-b-2 border-black">
          <th class="td-style">
            שם קורס
            <span style="float: left"
              ><font-awesome-icon :icon="['fas', 'align-left']" class="ml-2"
            /></span>
          </th>
          <th class="td-style">
            סמסטר
            <span style="float: left"
              ><font-awesome-icon :icon="['fas', 'align-left']" class="ml-2"
            /></span>
          </th>
          <th class="td-style">
            מרצה
            <span style="float: left"
              ><font-awesome-icon :icon="['fas', 'align-left']" class="ml-2"
            /></span>
          </th>
          <th class="td-style">
            מתרגל/ת
            <span style="float: left"
              ><font-awesome-icon :icon="['fas', 'align-left']" class="ml-2"
            /></span>
          </th>
          <th v-if="whichTable != 'myCourses'" class="td-style">
            חוות דעת קורס
            <span style="float: left"
              ><font-awesome-icon :icon="['fas', 'align-left']" class="ml-2"
            /></span>
          </th>
          <th v-if="whichTable != 'myCourses'" class="td-style">
            חוות דעת מרצה
            <span style="float: left"
              ><font-awesome-icon :icon="['fas', 'align-left']" class="ml-2"
            /></span>
          </th>
          <th v-if="whichTable != 'myCourses'" class="td-style">
            חוות דעת מתרגל/ת
            <span style="float: left"
              ><font-awesome-icon :icon="['fas', 'align-left']" class="ml-2"
            /></span>
          </th>
          <th v-if="whichTable === 'myCourses'" class="td-style">
            מחק מהקורסים שלי
            <span style="float: left"
              ><font-awesome-icon :icon="['fas', 'align-left']" class="ml-2"
            /></span>
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
  methods: {
    sendTo(msg) {
      this.$router.push(msg)
    },
  },
}
</script>

<style scoped>
.td-style {
  @apply w-1/7;
  @apply py-4;
  @apply mx-0;
  @apply font-normal;
}
.td-my-courses {
  @apply w-1/5;
  @apply py-4;
  @apply mx-0;
  @apply font-normal;
}
@screen sm {
  .td-style {
    @apply text-xs;
  }
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
