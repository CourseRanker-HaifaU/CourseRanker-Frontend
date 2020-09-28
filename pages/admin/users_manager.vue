<template>
  <div class="w-full text-center">
    <panel-page-title title="ניהול משתמשים" back-button />
    <div class="py-8 min-w-full">
      <div class="my-2 flex flex-col items-start justify-start md:flex-row">
        <div class="md:ml-4">
          <multiselect
            v-model="selectedType"
            :options="typeOptions"
            :searchable="false"
            :show-labels="false"
            label="label"
            track-by="label"
            class="min-w-0"
          >
          </multiselect>
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
      <div class="py-4 pb-0 overflow-x-auto">
        <div class="min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal text-right" infinite-wrapper>
            <thead>
              <tr>
                <th class="column-title">שם פרטי</th>
                <th class="column-title">שם משפחה</th>
                <th class="column-title">כתובת מייל</th>
                <th class="column-title">סוג משתמש</th>
                <th class="column-title">תאריך יצירה</th>
                <th class="column-title">פעולות</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in allUsersOptions"
                :key="`name-${index}`"
              >
                <td class="row items-center">
                  <div v-if="!row.isEdit">{{ row.firstName }}</div>
                  <div v-if="row.isEdit">
                    <input-field
                      id="firstName"
                      v-model="row.firstName"
                      type="text"
                    />
                  </div>
                </td>
                <td class="row items-center">
                  <div v-if="!row.isEdit">{{ row.lastName }}</div>
                  <div v-if="row.isEdit">
                    <input-field
                      id="lastName"
                      v-model="row.lastName"
                      type="text"
                    />
                  </div>
                </td>
                <td class="row">
                  <div v-if="!row.isEdit">
                    {{ row.email }}
                  </div>
                  <div v-if="row.isEdit">
                    <input-field id="email" v-model="row.email" type="email" />
                  </div>
                </td>
                <td class="row">
                  <div v-if="!row.isEdit">
                    {{ row.role.label }}
                  </div>
                  <div v-if="row.isEdit">
                    <multiselect
                      v-model="row.role"
                      :options="typeEditOptions"
                      :searchable="false"
                      :show-labels="false"
                      label="label"
                      track-by="id"
                    >
                    </multiselect>
                  </div>
                </td>
                <td class="row">
                  {{
                    DateTime.fromISO(row.createdDate)
                      .setLocale('he')
                      .toLocaleString(DateTime.DATE_SHORT)
                  }}
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
          <infinite-loading
            v-if="!$apollo.loading && allUsersOptions.length > 0"
            :force-use-infinite-wrapper="true"
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
      typeOptions: [
        {
          searchTerm: '',
          label: 'הכול',
        },
        {
          searchTerm: '3',
          label: 'מנהל',
        },
        {
          searchTerm: '2',
          label: 'עורך תוכן',
        },
        {
          searchTerm: '1',
          label: 'משתמש',
        },
      ],
      typeEditOptions: [
        {
          id: '1',
          label: 'משתמש',
        },
        {
          id: '2',
          label: 'עורך תוכן',
        },
        {
          id: '3',
          label: 'מנהל',
        },
      ],
      selectedType: {
        searchTerm: '',
        label: 'הכול',
      },
      filter: '',
      posts: [''],
      perPage: 5,
      allUsers: {
        pageInfo: {},
      },
      after: '',
    }
  },
  computed: {
    allUsersOptions() {
      if (!('edges' in this.allUsers)) {
        return []
      }
      return this.allUsers.edges.map((item) => item.node)
    },
  },
  apollo: {
    allUsers: {
      query: allUsers,
      variables() {
        return {
          after: '',
          perPage: this.perPage,
          keywords: this.filter,
          role: this.selectedType.searchTerm,
        }
      },
      update: (data) => {
        const serverData = data.allUsers
        for (const item of serverData.edges) {
          item.node.isEdit = false
          if (typeof item.node.role === 'string') {
            const roleID = item.node.role.split('_')[1]
            const rolesMapping = {
              1: {
                id: '1',
                label: 'משתמש',
              },
              2: {
                id: '2',
                label: 'עורך תוכן',
              },
              3: {
                id: '3',
                label: 'מנהל',
              },
            }
            item.node.role = rolesMapping[parseInt(roleID, 10)]
          }
        }
        return serverData
      },
      throttle: 300,
      debounce: 300,
    },
  },
  methods: {
    roleParser,
    sendTo(msg) {
      this.$router.push(msg)
    },
    editOn(index) {
      if (this.allUsers.edges[index].node.isEdit) {
        this.allUsers.edges[index].node.isEdit = false
        this.updateUser(index)
      } else {
        this.allUsers.edges[index].node.isEdit = true
      }
    },
    async updateUser(id) {
      await this.$apollo.mutate({
        mutation: updateUser,
        variables: {
          input: {
            id: this.allUsers.edges[id].node.id,
            email: this.allUsers.edges[id].node.email,
            firstName: this.allUsers.edges[id].node.firstName,
            lastName: this.allUsers.edges[id].node.lastName,
            role: this.allUsers.edges[id].node.role.id,
          },
        },
      })
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
    infiniteHandler($state) {
      if (!this.allUsers.pageInfo.hasNextPage) {
        $state.complete()
      } else {
        const nextPageCursor = this.allUsers.pageInfo.endCursor
        this.$apollo.queries.allUsers
          .fetchMore({
            query: allUsers,
            variables: {
              perPage: this.perPage,
              keywords: this.filter,
              role: this.selectedType.searchTerm,
              after: nextPageCursor,
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              const newResult = { ...prevResult }
              newResult.allUsers.edges = [
                ...prevResult.allUsers.edges,
                ...fetchMoreResult.allUsers.edges,
              ]
              newResult.allUsers.pageInfo = fetchMoreResult.allUsers.pageInfo
              return newResult
            },
          })
          .then(() => $state.loaded())
      }
    },
  },
}
</script>

<style scoped>
.column-title {
  @apply px-4;
  @apply py-3;
  @apply bg-primary;
  @apply text-white;
}

.row {
  @apply px-4;
  @apply py-4;
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
  @apply my-1;
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
