<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="ניהול משתמשים" back-button />
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
              v-model="selectedType"
              :options="typeOptions"
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
                <th class="column-title">שם המשתמש</th>
                <th class="column-title">כתובת מייל</th>
                <th class="column-title">סוג משתמש</th>
                <th class="column-title">תאריך יצירה</th>
                <th class="column-title">פעולות</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in filteredRows" :key="`name-${index}`">
                <td class="row items-center">
                  <div v-if="!row.isEdit">{{ fullName(row) }}</div>
                  <div v-if="row.isEdit">
                    <input
                      type="text"
                      :value="fullName(row)"
                      @input="updateName($event, row)"
                    />
                  </div>
                </td>
                <td class="row">
                  <div v-if="!row.isEdit">
                    {{ row.email }}
                  </div>
                  <div v-if="row.isEdit">
                    <input v-model="row.email" type="text" />
                  </div>
                </td>
                <td class="row">
                  <div v-if="!row.isEdit">
                    {{ roleParser(row.role) }}
                  </div>
                  <div v-if="row.isEdit">
                    <multiselect
                      v-model="row.role"
                      :options="typeEditOptions"
                      :searchable="false"
                      :show-labels="false"
                    >
                    </multiselect>
                  </div>
                </td>
                <td class="row">
                  <div v-if="!row.isEdit">
                    {{
                      DateTime.fromISO(row.createdDate)
                        .setLocale('he')
                        .toLocaleString({
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })
                    }}
                  </div>
                  <div v-if="row.isEdit">
                    <input v-model="row.createdDate" type="text" />
                  </div>
                </td>
                <td class="row">
                  <button
                    v-if="!row.isEdit"
                    class="table-btn"
                    @click="editOn(index)"
                  >
                    ערוך
                  </button>
                  <button
                    v-if="row.isEdit"
                    class="table-btn"
                    @click="editOn(index)"
                  >
                    שמור
                  </button>
                  <button class="table-btn" @click="deleteUser(index)">
                    מחק
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
import allUsers from '@/gql/allUsers.gql'
import deleteUser from '@/gql/deleteUser.gql'
import updateUser from '@/gql/updateUser.gql'
import { roleParser } from '@/utils'
import { DateTime } from 'luxon'

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
      DateTime,
      perPageOptions: [5, 10, 20],
      typeOptions: ['הכול', 'מנהל', 'עורך תוכן', 'משתמש'],
      typeEditOptions: ['מנהל', 'עורך תוכן', 'משתמש'],
      selectedType: 'הכול',
      filter: '',
      posts: [''],
      page: 1,
      perPage: 5,
      pages: [1, 2, 3],
      allUsers: [],
      isEdit: false,
    }
  },
  computed: {
    allUsersOptions() {
      if (!('edges' in this.allUsers)) {
        return []
      }
      return this.allUsers.edges.map((item) => item.node)
    },
    rowsInPage() {
      return this.allUsersOptions.slice(
        this.perPage * (this.page - 1),
        this.perPage * this.page
      )
    },
    filteredRows() {
      return this.rowsInPage.filter((row) => {
        const name =
          row.firstName.toString().toLowerCase() +
          ' ' +
          row.lastName.toString().toLowerCase()
        const type = row.role
        const searchTerm = this.filter.toLowerCase()

        if (this.selectedType === 'הכול') return name.includes(searchTerm)
        return name.includes(searchTerm) && type === this.selectedType
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
    roleParser,
    fullName(row) {
      return row.firstName + ' ' + row.lastName
    },
    updateName(event, row) {
      if (event.target.value.includes(' ')) {
        const sepName = event.target.value.split(' ')
        row.firstName = sepName[0]
        row.lastName = sepName[1]
      }
    },
    sendTo(msg) {
      this.$router.push(msg)
    },
    editOn(index) {
      if (this.allUsers.edges[index].node.isEdit) {
        this.allUsers.edges[index].node.isEdit = false
        updateUser(index)
      } else {
        this.allUsers.edges[index].node.isEdit = true
      }
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
    async updateUser(id) {
      await this.$apollo.mutate({
        mutation: updateUser,
        variables: {
          input: {
            id: this.allUsers.edges[id].node.id,
            email: this.allUsers.edges[id].node.email,
            password: '',
            firstName: this.allUsers.edges[id].node.firstName,
            lastName: this.allUsers.edges[id].node.lastName,
          },
        },
      })
      this.allUsers.edges.splice(id, 1)
      alert('המשתמש עודכן בהצלחה!')
    },
    async deleteUser(id) {
      await this.$apollo.mutate({
        mutation: deleteUser,
        variables: {
          input: {
            id: this.allUsers.edges[id].node.id,
          },
        },
      })
      this.allUsers.edges.splice(id, 1)
      alert('המשתמש נמחק בהצלחה!')
    },
  },
  apollo: {
    allUsers: {
      query: allUsers,
      update: (data) => {
        const serverData = data.allUsers
        for (const item of serverData.edges) {
          item.node.isEdit = false
        }
        return serverData
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

.table-btn {
  @apply text-white;
  @apply bg-primary;
  @apply p-2;
  @apply rounded;
}
.table-btn:active {
  @apply outline-none;
}

tr:hover td {
  @apply bg-secondary-hover;
}

p {
  @apply text-gray-900;
  @apply whitespace-no-wrap;
}
</style>
