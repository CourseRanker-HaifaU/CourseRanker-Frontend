<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="דיווחים על תוכן פוגעני" back-button />
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
        <div class="block relative">
          <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
              ></path>
            </svg>
          </span>
          <input
            v-model="filter"
            placeholder="חפש משתמש"
            class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="column-title">משתמש מדווח</th>
                <th class="column-title">סוג משתמש</th>
                <th class="column-title">נשלח בתאריך</th>
                <th class="column-title">כותב התגובה</th>
                <th class="column-title">תגובה מדווחת</th>
                <th class="column-title">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in filteredRows" :key="`name-${index}`">
                <td class="row items-center">{{ row.name }}</td>
                <td class="row">{{ row.type }}</td>
                <td class="row">{{ row.date }}</td>
                <td class="row">{{ row.author }}</td>
                <td class="row cursor-pointer;" @click="sendTo(`/course/`)">
                  {{ row.comment }}
                </td>
                <td class="row">
                  <span
                    class="status-cell"
                    :class="{
                      'status-red': row.status == 'לא טופל',
                      'status-green': row.status == 'טופל',
                      'status-orange': row.status == 'תלונת שווא',
                    }"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 opacity-50 rounded-full"
                      :class="{
                        'status-red-inner': row.status == 'לא טופל',
                        'status-green-inner': row.status == 'טופל',
                        'status-orange-inner': row.status == 'תלונת שווא',
                      }"
                    ></span>
                    <span class="relative"> {{ row.status }}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
          >
            <span class="text-gray-900 text-sm">
              מראה 1 עד 4 דיווחים מתוך 50
            </span>
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
      statusOptions: ['הכול', 'טופל', 'לא טופל', 'תלונת שוואֲ'],
      selectedStatus: 'הכול',
      filter: '',
      posts: [''],
      page: 1,
      perPage: 5,
      pages: [1, 2, 3],
      rows: [
        {
          name: 'אבי אבן',
          type: 'מנהל',
          date: '22/02/2020',
          author: 'שלמה זרעיה',
          comment: '*תמצית תגובה עם קישור*',
          status: 'טופל',
        },
        {
          name: 'שימי שמיים',
          type: 'עורך תוכן',
          date: '22/02/2020',
          author: 'שלמה זרעיה',
          comment: '*תמצית תגובה עם קישור*',
          status: 'לא טופל',
        },
        {
          name: 'דנה כהן',
          type: 'משתמש',
          date: '22/02/2020',
          author: 'שלמה זרעיה',
          comment: '*תמצית תגובה עם קישור*',
          status: 'תלונת שווא',
        },
      ],
    }
  },
  computed: {
    rowsInPage() {
      return this.rows.slice(
        this.perPage * (this.page - 1),
        this.perPage * this.page
      )
    },
    filteredRows() {
      return this.rowsInPage.filter((row) => {
        const name = row.name.toString().toLowerCase()
        const status = row.status
        const searchTerm = this.filter.toLowerCase()

        if (this.selectedStatus === 'הכול') return name.includes(searchTerm)
        return name.includes(searchTerm) && status === this.selectedStatus
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
    sendTo(msg) {
      this.$router.push(msg)
    },
    highlightMatches(text) {
      const matchExists = text.toLowerCase().includes(this.filter.toLowerCase())
      if (!matchExists) return text

      const re = new RegExp(this.filter, 'ig')
      return text.replace(
        re,
        (matchedText) => `<strong>${matchedText}</strong>`
      )
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

.nav-button {
  @apply text-sm;
  @apply bg-gray-300;
  @apply text-gray-800;
  @apply font-semibold;
  @apply py-2;
  @apply px-4;
  @apply leading-tight;
}

.nav-button:hover {
  @apply bg-secondary-hover;
}

tr:hover td {
  @apply bg-secondary-hover;
}

p {
  @apply text-gray-900;
  @apply whitespace-no-wrap;
}
</style>
