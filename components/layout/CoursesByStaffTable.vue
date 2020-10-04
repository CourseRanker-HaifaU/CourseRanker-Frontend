<template>
  <div class="frame-div flex flex-col w-full items-stretch justify-start">
    <div v-if="isSmall" class="courses-cards">
      <div
        v-for="listItem in staffCourseList"
        :key="listItem.node.courseSemester.id"
        class="responsive-card hover:bg-secondary-hover cursor-pointer"
        @click="sendTo(`/course/${listItem.node.courseSemester.course.id}`)"
      >
        <div>
          <strong>שם קורס:</strong>
          {{ listItem.node.courseSemester.course.name }}
        </div>
        <div>
          <strong>סמסטר:</strong>
          {{ getSemester(listItem.node.courseSemester.semester) }}
        </div>
      </div>
    </div>
    <table v-if="!isSmall" class="lg:w-full text-right min-w-full">
      <thead>
        <tr class="border-b-2 border-black">
          <th class="td-style">שם קורס</th>
          <th class="td-style">סמסטר</th>
        </tr>
      </thead>
      <tr
        v-for="listItem in staffCourseList"
        :key="listItem.node.courseSemester.id"
        class="border-b border-black text-right hover:bg-gray-200 cursor-pointer"
        @click="sendTo(`/course/${listItem.node.courseSemester.course.id}`)"
      >
        <!-------------------- 1st col -------------------->
        <td class="td-my-courses">
          {{ listItem.node.courseSemester.course.name }}
        </td>

        <!-------------------- 2nd col -------------------->
        <td class="td-my-courses">
          {{ getSemester(listItem.node.courseSemester.semester) }}
        </td>
      </tr>
    </table>
    <infinite-loading
      v-if="!isLoading"
      :identifier="`courses-by-staff-table-${staffID}`"
      @infinite="infiniteHandler"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
import SmallWidthMixin from '@/mixins/small_width'
import { getSemester } from '@/utils'

export default {
  mixins: [SmallWidthMixin],
  props: {
    staffCourseList: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    infiniteHandler: {
      type: Function,
      required: true,
    },
    staffID: {
      type: String,
      default: '',
    },
  },
  methods: {
    sendTo(msg) {
      this.$router.push(msg)
    },
    getSemester,
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
