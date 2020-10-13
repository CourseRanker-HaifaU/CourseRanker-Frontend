<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="ניהול ציונים והתפלגויות" back-button />
    <div class="py-8 min-w-full">
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0">
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
              <tr v-for="(row, index) in rows.edges" :key="row.node.id">
                <td class="row items-center">
                  {{ row.node.uploader.firstName }}
                  {{ row.node.uploader.lastName }}
                </td>
                <td class="row">{{ row.node.courseSemester.course.name }}</td>
                <td class="row">
                  {{ getSemester(row.node.courseSemester.semester) }}
                </td>
                <td v-if="!row.node.isEdit" class="row">{{ row.node.moed }}</td>
                <td v-if="row.node.isEdit" class="row">
                  <input-field id="moed" v-model="row.node.moed" type="text" />
                </td>
                <td v-if="!row.node.isEdit" class="row">
                  {{ row.node.average }}
                </td>
                <td v-if="row.node.isEdit" class="row">
                  <input-field
                    id="average"
                    v-model="row.node.average"
                    type="text"
                  />
                </td>
                <td class="row">
                  <button
                    class="table-btn min-w-full xxl:min-w-0"
                    @click="popModal(index)"
                  >
                    הצג התפלגות
                  </button>
                </td>
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
                    @click.prevent="approveGrades(row.node)"
                  >
                    אשר התפלגות
                  </button>
                  <button
                    v-if="!row.node.isEdit"
                    class="table-btn min-w-full xxl:min-w-0"
                    @click="editOn(index)"
                  >
                    ערוך התפלגות
                  </button>
                  <button
                    v-if="row.node.isEdit"
                    class="table-btn min-w-full xxl:min-w-0"
                    @click="editOn(index)"
                  >
                    שמור התפלגות
                  </button>
                  <button
                    class="table-btn min-w-full xxl:min-w-0"
                    @click.prevent="DeleteGrades(index)"
                  >
                    מחק התפלגות
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!--Modal-->
          <div
            v-if="modalOn"
            class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
          >
            <div
              class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"
              @click="popModal"
            ></div>

            <div
              class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg overflow-y-auto z-50"
            >
              <div
                class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
                @click="popModal"
              >
                <svg
                  class="fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                  ></path>
                </svg>
              </div>

              <!-- Add margin if you want to see some of the overlay behind the modal-->
              <div class="modal-content py-4 text-left px-6">
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                  <p class="text-2xl font-bold">התפלגות הציונים</p>
                  <div class="modal-close cursor-pointer z-50">
                    <svg
                      class="fill-current text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      @click="popModal"
                    >
                      <path
                        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <!--Body-->
                <div
                  v-for="i in 10"
                  :key="`histogram_bin_${i}`"
                  class="flex flex-col items-right rounded-lg border-input-border border border-solid mb-2 p-2 text-right"
                  dir="ltr"
                >
                  <label :for="`histogram_bin_${i}_input`">
                    {{ histogramMapping[i - 1] }}:
                  </label>
                  <input-field
                    :id="`histogram_bin_${i}_input`"
                    v-model.number="histogram[i - 1]"
                    type="number"
                    :label="histogramMapping[i - 1]"
                  ></input-field>
                </div>

                <!--Footer-->
                <div class="flex justify-end pt-2">
                  <button
                    class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                    @click="popModal"
                  >
                    סגור
                  </button>
                </div>
              </div>
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
import deleteGrades from '@/gql/deleteGrades.gql'
import editGrades from '@/gql/editGrades.gql'
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
      statusOptions: ['אושר', 'לא אושר', 'הכול'],
      selectedStatus: 'הכול',
      perPage: 5,
      rows: {
        edges: [],
      },
      histogramMapping: [
        '0-10',
        '11-20',
        '21-30',
        '31-40',
        '41-50',
        '51-60',
        '61-70',
        '71-80',
        '81-90',
        '91+',
      ],
      modalOn: false,
      modalIndex: -1,
      histogram: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    popModal(index) {
      if (this.modalOn) {
        this.rows.edges[this.modalIndex].node.histogram = [...this.histogram]
        this.modalOn = false
      } else {
        this.histogram = [...this.rows.edges[index].node.histogram]
        this.modalIndex = index
        this.modalOn = true
      }
    },
    editOn(index) {
      if (this.rows.edges[index].node.isEdit) {
        this.rows.edges[index].node.isEdit = false
        this.editGrades(index)
      } else {
        this.rows.edges[index].node.isEdit = true
      }
    },
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
    async DeleteGrades(id) {
      await this.$apollo.mutate({
        mutation: deleteGrades,
        variables: {
          input: {
            id: this.rows.edges[id].node.id,
          },
        },
      })
      showSuccessToast(this, 'התפלגות נמחקה בהצלחה', null, () => {
        this.rows.edges.splice(id, 1)
      })
    },
    async editGrades(id) {
      await this.$apollo.mutate({
        mutation: editGrades,
        variables: {
          input: {
            id: this.rows.edges[id].node.id,
            moed: this.rows.edges[id].node.moed,
            average: this.rows.edges[id].node.average,
            histogram: this.rows.edges[id].node.histogram,
          },
        },
      })
      showSuccessToast(this, 'ההתפלגות עודכנה בהצלחה')
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
  },
  apollo: {
    rows: {
      query: allGrades,
      update: (data) => {
        const serverData = data.allGrades
        for (const item of serverData.edges) {
          item.node.isEdit = false
        }
        return serverData
      },
      fetchPolicy: 'network-only',
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
