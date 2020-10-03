<template>
  <div class="frame-div flex flex-col w-full items-stretch justify-start">
    <div v-if="isSmall" class="courses-cards">
      <div
        v-for="listItem in courseList.dataArray"
        :key="listItem.id"
        class="cursor-pointer responsive-card hover:bg-secondary-hover"
        @click="sendTo(`/staff/${listItem.staff.id}`)"
      >
        <div>
          <strong>שם איש הסגל:</strong>
          {{ listItem.staff.name }}
        </div>
        <div>
          <strong>חוות דעת מרצה:</strong>
          <rating :rating="listItem.averageLecturerRating" />
          <button class="button button-blue">הוספת חוות דעת</button>
        </div>
        <div>
          <strong>חוות דעת מתרגל/ת:</strong>
          <rating :rating="listItem.averageTeachingAssistantRating" />
          <button class="button button-blue">הוספת חוות דעת</button>
        </div>
      </div>
    </div>
    <table v-if="!isSmall" class="lg:w-full text-right min-w-full">
      <thead>
        <tr class="border-b-2 border-black">
          <th class="td-style">שם המרצה</th>
          <th class="td-style">חוות דעת מרצה</th>
          <th class="td-style">חוות דעת מתרגל/ת</th>
        </tr>
      </thead>

      <tr
        v-for="listItem in courseList.dataArray"
        :key="listItem.id"
        class="cursor-pointer border-b border-black text-right hover:bg-gray-200"
        @click="sendTo(`/staff/${listItem.staff.id}`)"
      >
        <!-------------------- 1st col -------------------->
        <td class="td-style">
          {{ listItem.staff.firstName }} {{ listItem.staff.lastName }}
        </td>

        <!-------------------- 2nd col-optional -------------------->
        <td class="td-style">
          <rating :rating="listItem.averageLecturerRating"></rating>
          <button class="table-btn">הוספת חוות דעת</button>
        </td>

        <!-------------------- 3rd col-optional -------------------->
        <td class="'td-style'">
          <rating :rating="listItem.averageTeachingAssistantRating"></rating>
          <button class="table-btn">הוספת חוות דעת</button>
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
export default {
  mixins: [SmallWidthMixin],
  props: {
    keywords: {
      type: String,
      default: '',
    },
    staffList: {
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
    sendTo(msg) {
      this.$router.push(msg)
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
