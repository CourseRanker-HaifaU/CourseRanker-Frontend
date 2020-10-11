<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="ניהול ציונים והתפלגויות" back-button />
    <div class="py-8 min-w-full">
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0">
          <div class="relative ml-4">
            <multiselect
              v-model="perPage"
              :options="perPageOptions"
              :searchable="false"
              :show-labels="false"
            >
            </multiselect>
          </div>
          <div class="relative ml-4">
            <multiselect
              v-model="selectedStatus"
              :options="statusOptions"
              :searchable="false"
              :show-labels="false"
            >
            </multiselect>
          </div>
        </div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="column-title">מעלה ההתפלגות</th>
                <th class="column-title">קורס</th>
                <th class="column-title">סימסטר</th>
                <th class="column-title">מועד</th>
                <th class="column-title">ממוצע</th>
                <th class="column-title">התפלגות</th>
                <th class="column-title">סטטוס</th>
                <th class="column-title">פעולות</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows.edges" :key="row.node.id">
                <td class="row items-center">?</td>
                <td class="row">{{ row.node.courseSemester.course.name }}</td>
                <td class="row">
                  {{ getSemester(row.node.courseSemester.semester) }}
                </td>
                <td class="row">{{ row.node.moed }}</td>
                <td class="row">{{ row.node.average }}</td>
                <td class="row">פה תהיה התפלגות</td>
                <td class="row">
                  <span
                    class="status-cell"
                    :class="{
                      'status-red':
                        getStringApproved(row.node.approved) === 'לא אושר',
                      'status-green':
                        getStringApproved(row.node.approved) === 'אושר',
                    }"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 opacity-50 rounded-full"
                      :class="{
                        'status-red-inner':
                          getStringApproved(row.node.approved) === 'לא אושר',
                        'status-green-inner':
                          getStringApproved(row.node.approved) === 'אושר',
                      }"
                    ></span>
                    <span class="relative">
                      {{ getStringApproved(row.node.approved) }}</span
                    >
                  </span>
                </td>
                <td>
                  <button
                    v-if="getStringApproved(row.node.approved) === 'לא אושר'"
                    class="table-btn min-w-full xxl:min-w-0"
                    @click.prevent="ApproveGrade(row.node)"
                  >
                    אשר התפלגות
                  </button>
                  <button
                    class="table-btn min-w-full xxl:min-w-0"
                    @click.prevent="ApproveGrade(row.node)"
                  >
                    ערוך התפלגות
                  </button>
                  <button
                    class="table-btn min-w-full xxl:min-w-0"
                    @click.prevent="ApproveGrade(row.node)"
                  >
                    מחק התפלגות
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
          >
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                v-if="page != 1"
                class="ml-2 button blue-button"
                @click="page--"
              >
                קודם
              </button>
              <button
                v-for="pageNumber in pages.slice(page - 1, page + 5)"
                :key="pageNumber"
                class="ml-2 button blue-button"
                @click="page = pageNumber"
              >
                {{ pageNumber }}
              </button>
              <button
                v-if="page < pages.length"
                class="rounded-r button blue-button"
                @click="page++"
              >
                הבא
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import allGrades from '@/gql/allGrades.gql'
import approveGrades from '@/gql/approveGrades.gql'
import { showSuccessToast, getSemester } from '@/utils'
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
      perPageOptions: [5, 10, 20],
      statusOptions: ['אושר', 'לא אושר', 'הכול'],
      selectedStatus: 'הכול',
      filter: '',
      posts: [''],
      page: 1,
      perPage: 5,
      pages: [1, 2, 3],
      rows: {
        edges: [],
      },
    }
  },
  computed: {
    rowsInPage() {
      return this.rows.edges.slice(
        this.perPage * (this.page - 1),
        this.perPage * this.page
      )
    },
    filteredRows() {
      return this.rowsInPage.filter((row) => {
        const name = row.node.moed
        const status = row.node.approved

        if (this.selectedStatus === 'הכול') return name
        return name && status === this.selectedStatus
      })
    },
    displayedPosts() {
      return this.paginate(this.posts)
    },
  },
  watch: {
    posts() {
      this.setPages()
    },
  },
  methods: {
    getSemester,
    async approveGrades(node) {
      await this.$apollo.mutate({
        mutation: approveGrades,
        variables: {
          id: node.id,
        },
      })
      node.approved = true
      showSuccessToast(this, 'ההתפלגות אושרה בהצלחה', null)
      this.$forceUpdate()
    },
    getStringApproved(approved) {
      if (approved) {
        return 'אושר'
      }
      return 'לא אושר'
    },
    sendTo(msg) {
      this.$router.push(msg)
    },
    setPages() {
      const numberOfPages = Math.ceil(this.posts.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(posts) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return this.posts.slice(from, to)
    },
  },
  apollo: {
    rows: {
      query: allGrades,
      update: (data) => {
        return data.allGrades
      },
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
  @apply cursor-pointer;
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

.status-green {
  @apply text-green-900;
}

.status-green-inner {
  @apply bg-green-200;
}

tr:hover td {
  @apply bg-secondary-hover;
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

p {
  @apply text-gray-900;
  @apply whitespace-no-wrap;
}
</style>
