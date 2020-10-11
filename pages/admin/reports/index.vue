<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="דיווחים על תוכן פוגעני" back-button />
    <div class="py-8 min-w-full">
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0">
          <div class="relative ml-4 w-32">
            <multiselect
              v-model="selectedStatus"
              :options="statusOptions"
              :searchable="false"
              :show-labels="false"
              label="label"
              track-by="label"
            >
            </multiselect>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="column-title">משתמש מדווח</th>
                <th class="column-title">סוג משתמש</th>
                <th class="column-title">נשלח בתאריך</th>
                <th class="column-title">כותב התגובה</th>
                <th class="column-title">תגובה מדווחת</th>
                <th class="column-title">סטטוס (לחץ לעריכה)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="edge in feedbackReports.edges" :key="edge.node.id">
                <td class="row">
                  {{
                    `${edge.node.reportedBy.firstName} ${edge.node.reportedBy.lastName}`
                  }}
                </td>
                <td class="row">
                  {{ roleParser(edge.node.reportedBy.role) }}
                </td>
                <td class="row">{{ getDate(edge.node.timestamp) }}</td>
                <td class="row">{{ edge.node.feedbackAuthor }}</td>
                <td class="row">
                  <nuxt-link
                    :to="`/feedback/${edge.node.userFeedback.courseSemester.id}?feedbackId=${edge.node.userFeedback.id}`"
                    class="underline text-primary hover:text-primary-hover"
                    >לביקורת</nuxt-link
                  >
                </td>
                <td class="row">
                  <nuxt-link
                    tag="span"
                    class="rounded-full p-2 font-bold cursor-pointer"
                    :class="statusClassMapping[edge.node.status]"
                    :to="`/admin/reports/${edge.node.id}`"
                  >
                    {{ statusMapping[edge.node.status] }}
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
          <infinite-loading
            v-if="feedbackReports.edges.length > 0 && !$apollo.loading"
            @infinite="infiniteHandler"
          >
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import feedbackReports from '@/gql/feedbackReports.gql'
import { roleParser, getDate } from '@/utils'

export default {
  components: {
    Multiselect,
  },
  filters: {
    trimWords(value) {
      return value.split(' ').splice(0, 20).join(' ') + '...'
    },
  },
  data() {
    return {
      statusOptions: [
        {
          label: 'הכול',
        },
        {
          id: 1,
          label: 'לא טופל',
        },
        {
          id: 2,
          label: 'טופל',
        },
        {
          id: 3,
          label: 'תלונת שווא',
        },
      ],
      selectedStatus: {
        label: 'הכול',
      },
      page: 1,
      perPage: 5,
      pages: [1, 2, 3],
      statusMapping: {
        A_1: 'לא טופל',
        A_2: 'טופל',
        A_3: 'תלונת שווא',
      },
      statusClassMapping: {
        A_1: 'status-red-inner',
        A_2: 'status-green-inner',
        A_3: 'status-orange-inner',
      },
      feedbackReports: {
        edges: [],
      },
    }
  },
  methods: {
    roleParser,
    getDate,
    infiniteHandler($state) {
      if (!this.feedbackReports.pageInfo.hasNextPage) {
        $state.complete()
      } else {
        const after = this.feedbackReports.pageInfo.endCursor
        this.$apollo.queries.feedbackReports
          .fetchMore({
            query: feedbackReports,
            variables: {
              perPage: this.perPage,
              after,
              status: this.selectedStatus.id,
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              const prevEdges = prevResult.feedbackReports.edges
              const nextEdges = fetchMoreResult.feedbackReports.edges
              const newResult = { ...prevResult }
              newResult.feedbackReports.edges = [...prevEdges, ...nextEdges]
              newResult.feedbackReports.pageInfo = {
                ...fetchMoreResult.feedbackReports.pageInfo,
              }
              return newResult
            },
          })
          .then(() => {
            $state.loaded()
          })
      }
    },
  },
  apollo: {
    feedbackReports: {
      query: feedbackReports,
      variables() {
        return {
          perPage: this.perPage,
          after: '',
          status: this.selectedStatus.id,
        }
      },
      fetchPolicy: 'no-cache',
    },
  },
}
</script>

<style scoped>
.column-title {
  @apply px-5;
  @apply py-3;
  @apply bg-primary;
  @apply text-white;
}

.row {
  @apply px-5;
  @apply py-5;
  @apply border-b;
  @apply border-gray-200;
  @apply bg-white;
  @apply text-sm;
  @apply cursor-default;
}

.status-cell {
  @apply relative;
  @apply inline-block;
  @apply px-3;
  @apply py-1;
  @apply font-semibold;
}

.status-red {
  @apply text-red-900;
}

.status-red-inner {
  @apply bg-red-200;
}

.status-orange {
  @apply text-orange-900;
}

.status-orange-inner {
  @apply bg-orange-200;
}

.status-green {
  @apply text-green-900;
}

.status-green-inner {
  @apply bg-green-200;
}

tr:hover td {
  @apply bg-secondary-hover;
}

p {
  @apply text-gray-900;
  @apply whitespace-no-wrap;
}
</style>
