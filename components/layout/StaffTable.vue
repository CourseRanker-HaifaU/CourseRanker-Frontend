<template>
  <div class="frame-div flex flex-col w-full items-stretch justify-start">
    <div v-if="isSmall" class="courses-cards">
      <div
        v-for="staff in allStaffOptions"
        :key="staff.id"
        class="cursor-pointer responsive-card hover:bg-secondary-hover"
        @click="sendTo(`/staff/${staff.id}`)"
      >
        <div class="col-span-2">
          <strong>שם איש הסגל:</strong>
          {{ correctTitle(staff.title) }} {{ staff.firstName }}
          {{ staff.lastName }}
        </div>
        <div>
          <strong>חוות דעת כמרצה:</strong>
          <rating :rating="staff.averageRatingAsLecturer" />
        </div>
        <div>
          <strong>חוות דעת כמתרגל/ת:</strong>
          <rating :rating="staff.averageRatingAsTeachingAssistant" />
        </div>
        <button class="button blue-button">הוספת חוות דעת</button>
        <button class="button blue-button">הוספת חוות דעת</button>
      </div>
    </div>
    <table v-if="!isSmall" class="lg:w-full text-right min-w-full">
      <thead>
        <tr class="border-b-2 border-black">
          <th class="td-style">שם איש הסגל</th>
          <th class="td-style">חוות דעת מרצה</th>
          <th class="td-style">חוות דעת מתרגל/ת</th>
        </tr>
      </thead>
      <tr
        v-for="staff in allStaffOptions"
        :key="staff.id"
        class="cursor-pointer border-b border-black text-right hover:bg-gray-200"
        @click="sendTo(`/staff/${staff.id}`)"
      >
        <!-------------------- 1st col -------------------->
        <td class="td-style">
          {{ correctTitle(staff.title) }} {{ staff.firstName }}
          {{ staff.lastName }}
        </td>

        <!-------------------- 2nd col-optional -------------------->
        <td class="td-style">
          <div class="flex items-baseline">
            <rating
              class="mt-2 ml-2"
              :rating="staff.averageRatingAsLecturer"
            ></rating>
            <button class="table-btn">הוספת חוות דעת</button>
          </div>
        </td>

        <!-------------------- 3rd col-optional -------------------->
        <td class="td-style">
          <div class="flex items-baseline">
            <rating
              class="mt-2 ml-2"
              :rating="staff.averageRatingAsTeachingAssistant"
            ></rating>
            <button class="table-btn">הוספת חוות דעת</button>
          </div>
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
import allStaff from '@/gql/allStaff.gql'
export default {
  mixins: [SmallWidthMixin],
  props: {
    keywords: {
      type: String,
      default: '',
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
      allStaff: {},
      windowWidth: window.innerWidth,
      rowsPerPage: 10,
      after: '',
      endCursor: '',
      hasNextPage: false,
    }
  },
  computed: {
    allStaffOptions() {
      if (!('edges' in this.allStaff)) {
        return []
      }
      return this.allStaff.edges.map((item) => item.node)
    },
  },
  methods: {
    sendTo(msg) {
      this.$router.push(msg)
    },
    correctTitle(title) {
      switch (title) {
        case 'MR':
          return "מר'"
        case 'MS':
          return "גב'"
        case 'DR':
          return 'ד"ר'
        case 'PR':
          return "פרופ'"
        default:
          return ''
      }
    },
  },
  apollo: {
    allStaff: {
      query: allStaff,
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
