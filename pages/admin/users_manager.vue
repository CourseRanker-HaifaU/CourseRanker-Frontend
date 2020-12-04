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
        <div class="block relative mt-2 md:mt-0">
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
          <table
            v-if="!isSmall"
            class="min-w-full leading-normal text-right"
            infinite-wrapper
          >
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
                  {{ getDate(row.createdDate) }}
                </td>
                <td class="row">
                  <button
                    v-if="!row.isEdit"
                    class="table-btn button blue-button"
                    @click="editOn(index)"
                  >
                    ערוך
                  </button>
                  <button
                    v-if="row.isEdit"
                    class="table-btn button blue-button"
                    @click="editOn(index)"
                  >
                    שמור
                  </button>
                  <button
                    class="table-btn button red-button xl:mr-2"
                    @click="deleteUser(index)"
                  >
                    מחק
                  </button>
                  <button
                    v-if="!row.isVerified"
                    class="table-btn button green-button xl:mr-2"
                    @click="verifyUser(index)"
                  >
                    אמת
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="isSmall">
            <div
              v-for="(row, index) in allUsersOptions"
              :key="`card-${index}`"
              class="responsive-card"
            >
              <div v-if="row.isEdit">
                <strong>שם פרטי:</strong>
                <input-field
                  id="firstName"
                  v-model="row.firstName"
                  type="text"
                />
              </div>
              <div v-else>
                <strong>שם פרטי:</strong>
                {{ row.firstName }}
              </div>
              <div v-if="row.isEdit">
                <strong>שם משפחה:</strong>
                <input-field id="lastName" v-model="row.lastName" type="text" />
              </div>
              <div v-else>
                <strong>שם משפחה:</strong>
                {{ row.lastName }}
              </div>
              <div v-if="row.isEdit">
                <strong>כתובת מייל:</strong>
                <input-field id="email" v-model="row.email" type="email" />
              </div>
              <div v-else>
                <strong>כתובת מייל:</strong>
                {{ row.email }}
              </div>
              <div v-if="row.isEdit">
                <strong>סוג משתמש:</strong>
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
              <div v-else>
                <strong>סוג משתמש:</strong>
                {{ row.role.label }}
              </div>
              <div>
                <strong>תאריך יצירה:</strong>
                {{ getDate(row.createdDate) }}
              </div>
              <div>
                <button
                  v-if="!row.isEdit"
                  class="table-btn button blue-button"
                  @click="editOn(index)"
                >
                  ערוך
                </button>
                <button
                  v-if="row.isEdit"
                  class="table-btn button blue-button"
                  @click="editOn(index)"
                >
                  שמור
                </button>
                <button
                  class="table-btn button red-button mr-2"
                  @click="deleteUser(index)"
                >
                  מחק
                </button>
                <button
                  v-if="!row.isVerified"
                  class="table-btn button green-button mr-2"
                  @click="verifyUser(index)"
                >
                  אמת
                </button>
              </div>
            </div>
          </div>
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
import isSmallMixin from '@/mixins/small_width'
import allUsers from '@/gql/allUsers.gql'
import deleteUser from '@/gql/deleteUser.gql'
import updateUser from '@/gql/updateUser.gql'
import manuallyVerifyUser from '@/gql/manuallyVerifyUser.gql'
import { roleParser, showSuccessToast, getDate } from '@/utils'

export default {
  components: {
    Multiselect,
  },
  filters: {
    trimWords(value) {
      return value.split(' ').splice(0, 20).join(' ') + '...'
    },
  },
  mixins: [isSmallMixin],
  data() {
    return {
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
    getDate,
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
      showSuccessToast(this, 'המשתמש עודכן בהצלחה')
    },
    async deleteUser(idx) {
      await this.$apollo.mutate({
        mutation: deleteUser,
        variables: {
          input: {
            id: this.allUsers.edges[idx].node.id,
          },
        },
      })
      showSuccessToast(this, 'המשתמש נמחק בהצלחה', null, () => {
        this.allUsers.edges.splice(idx, 1)
      })
    },
    async verifyUser(idx) {
      await this.$apollo.mutate({
        mutation: manuallyVerifyUser,
        variables: {
          input: {
            email: this.allUsers.edges[idx].node.email,
          },
        },
      })
      showSuccessToast(this, 'המשתמש אומת בהצלחה', null, () => {
        this.$apollo.queries.allUsers.refetch()
      })
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
