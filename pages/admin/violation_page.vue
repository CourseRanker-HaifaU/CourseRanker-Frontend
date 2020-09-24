<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="דיווחים על תוכן פוגעני" back-button />
    <body class="antialiased font-sans bg-gray-200">
      <div class="container mx-auto px-32 sm:px-64">
        <div class="py-8">
          <div class="my-2 flex sm:flex-row flex-col">
            <div class="flex flex-row mb-1 sm:mb-0">
              <div class="relative ml-4">
                <select
                  class="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
              <div class="relative ml-4">
                <select
                  class="appearance-none h-full rounded-r border-t sm:rounded-r-none border-r border-l border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option>הכל</option>
                  <option>טופל</option>
                  <option>לא טופל</option>
                  <option>תלונת שווא</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="block relative">
              <span
                class="h-full absolute inset-y-0 left-0 flex items-center pl-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 fill-current text-gray-500"
                >
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                  ></path>
                </svg>
              </span>
              <input
                placeholder="חפש משתמש"
                class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              class="inline-block min-w-full shadow rounded-lg overflow-hidden"
            >
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
                  <tr
                    v-for="(row, index) in filteredRows"
                    :key="`name-${index}`"
                  >
                    <td
                      class="row items-center"
                      v-html="highlightMatches(row.name)"
                    ></td>
                    <td
                      class="row"
                      v-html="highlightMatches([...row.type].sort().join(', '))"
                    ></td>
                    <td
                      class="row"
                      v-html="highlightMatches([...row.date].sort().join(', '))"
                    ></td>
                    <td
                      class="row"
                      v-html="
                        highlightMatches([...row.author].sort().join(', '))
                      "
                    ></td>
                    <td
                      class="row"
                      v-html="
                        highlightMatches([...row.comment].sort().join(', '))
                      "
                    ></td>
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
                <span class="text-xs xs:text-sm text-gray-900">
                  מראה 1 עד 4 דיווחים מתוך 50
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                  <button class="nav-button rounded-l ml-2">קודם</button>
                  <button class="nav-button rounded-r">הבא</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: '',
      rows: [
        {
          name: 'אבי אבן',
          type: ['מנהל'],
          date: ['22/02/2020'],
          author: 'שלמה זרעיה',
          comment: ['*תמצית תגובה עם קישור*'],
          status: ['טופל'],
        },
        {
          name: 'שימי שמיים',
          type: ['עורך תוכן'],
          date: ['22/02/2020'],
          author: 'שלמה זרעיה',
          comment: ['*תמצית תגובה עם קישור*'],
          status: ['לא טופל'],
        },
        {
          name: 'דנה כהן',
          type: ['משתמש'],
          date: ['22/02/2020'],
          author: 'שלמה זרעיה',
          comment: ['*תמצית תגובה עם קישור*'],
          status: ['תלונת שווא'],
        },
      ],
    }
  },
  computed: {
    filteredRows() {
      return this.rows.filter((row) => {
        const name = row.name.toString().toLowerCase()
        const searchTerm = this.filter.toLowerCase()

        return name.includes(searchTerm)
      })
    },
  },
  methods: {
    highlightMatches(text) {
      const matchExists = text.toLowerCase().includes(this.filter.toLowerCase())
      if (!matchExists) return text

      const re = new RegExp(this.filter, 'ig')
      return text.replace(
        re,
        (matchedText) => `<strong>${matchedText}</strong>`
      )
    },
  },
}
</script>

<style scoped>
.column-title {
  @apply px-5;
  @apply py-3;
  @apply border-b-2;
  @apply border-gray-200;
  @apply bg-gray-100;
  @apply text-center;
  @apply text-xs;
  @apply font-semibold;
  @apply text-gray-600;
  @apply uppercase;
  @apply tracking-wider;
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
