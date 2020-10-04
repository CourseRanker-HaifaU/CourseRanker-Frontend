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
          {{ staffToString(staff) }}
        </div>
        <div>
          <strong>חוות דעת כמרצה:</strong>
          <rating :rating="staff.averageRatingAsLecturer" />
        </div>
        <div>
          <strong>חוות דעת כמתרגל/ת:</strong>
          <rating :rating="staff.averageRatingAsTeachingAssistant" />
        </div>
      </div>
    </div>
    <table v-if="!isSmall" class="lg:w-full text-right min-w-full">
      <thead>
        <tr class="border-b-2 border-black">
          <th class="td-style">שם איש הסגל</th>
          <th class="td-style">חוות דעת כמרצה</th>
          <th class="td-style">חוות דעת כמתרגל/ת</th>
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
          {{ staffToString(staff) }}
        </td>

        <!-------------------- 2nd col-optional -------------------->
        <td class="td-style">
          <div class="flex items-baseline">
            <rating
              class="mt-2 ml-2"
              :rating="staff.averageRatingAsLecturer"
            ></rating>
          </div>
        </td>

        <!-------------------- 3rd col-optional -------------------->
        <td class="td-style">
          <div class="flex items-baseline">
            <rating
              class="mt-2 ml-2"
              :rating="staff.averageRatingAsTeachingAssistant"
            ></rating>
          </div>
        </td>
      </tr>
    </table>
    <infinite-loading
      v-if="!isLoading"
      identifier="staff-table"
      @infinite="infiniteHandler"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
import SmallWidthMixin from '@/mixins/small_width'
import { staffToString } from '@/utils'
import { mapMutations } from 'vuex'

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
    staffList: {
      type: Object,
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
  computed: {
    allStaffOptions() {
      if (!('edges' in this.staffList)) {
        return []
      }
      return this.staffList.edges.map((item) => item.node)
    },
  },
  methods: {
    ...mapMutations({
      changeKeywords: 'search/changeKeywords',
    }),
    staffToString,
    sendTo(msg) {
      this.changeKeywords('')
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
