<template>
  <div class="frame-div flex items-stretch flex-shrink w-full">
    <table class="lg:w-full text-right">
      <thead>
        <tr class="border-b-2 border-black">
          <th class="td-style">
            שם קורס
            <font-awesome-icon :icon="['fas', 'align-left']" class="mr-2" />
          </th>
          <th class="td-style">
            סמסטר
            <font-awesome-icon :icon="['fas', 'align-left']" class="mr-2" />
          </th>
          <th class="td-style">
            מרצה
            <font-awesome-icon :icon="['fas', 'align-left']" class="mr-2" />
          </th>
          <th class="td-style">
            מתרגל/ת
            <font-awesome-icon :icon="['fas', 'align-left']" class="mr-2" />
          </th>
          <th class="td-style">
            חוות דעת קורס
            <font-awesome-icon :icon="['fas', 'align-left']" class="mr-2" />
          </th>
          <th class="td-style">
            חוות דעת מרצה
            <font-awesome-icon :icon="['fas', 'align-left']" class="mr-2" />
          </th>
          <th class="td-style">
            חוות דעת מתרגל/ת
            <font-awesome-icon :icon="['fas', 'align-left']" class="mr-2" />
          </th>
        </tr>
      </thead>

      <tr
        v-for="course in courses"
        :key="course.id"
        class="cursor-pointer border-b border-black text-right"
        @click="sendTo(`/course/${course.id}`)"
      >
        <td class="td-style">
          {{ course.name }}
        </td>
        <td class="td-style">
          {{ course.semester }}
        </td>
        <td class="td-style">
          {{ course.lecturer }}
        </td>
        <td class="td-style">
          {{ course.teachingAssistant }}
        </td>
        <td class="td-style">
          <rating :rating="5" style="font-size: 7px"></rating>
        </td>
        <td class="td-style">
          <rating :rating="4" style="font-size: 7px"></rating>
        </td>
        <td class="td-style">
          <rating :rating="5" style="font-size: 7px"></rating>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
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
</style>
