<template>
  <div class="min-w-full w-full text-center">
    <panel-page-title title="שאלות דירוג" back-button />
    <div class="py-8 min-w-full mr-0">
      <input-field
        id="keywords_search"
        v-model="keywords"
        type="text"
        label="חיפוש שאלה"
        show-label
      />
      <div class="py-4 pb-0 overflow-x-auto">
        <div class="min-w-full shadow rounded-lg overflow-hidden">
          <table
            v-if="!isSmall"
            class="min-w-full leading-normal text-right"
            infinite-wrapper
          >
            <thead>
              <tr>
                <th class="column-title">שאלה</th>
                <th class="column-title">סיווג</th>
                <th class="column-title">פעולות</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="row">
                  <input-field
                    id="question"
                    v-model="newQuestion.question"
                    type="text"
                    label="ניתן להוסיף שאלה חדשה כאן"
                  />
                </td>
                <td class="row">
                  <multiselect
                    v-model="newQuestion.classification"
                    :options="typeEditOptions"
                    :searchable="false"
                    :show-labels="false"
                    label="label"
                    track-by="classification"
                  >
                  </multiselect>
                </td>
                <td class="row">
                  <button class="button green-button" @click="addQuestion">
                    הוסף
                  </button>
                  <button
                    class="button blue-button mt-2 lg:mt-0 lg:mr-2"
                    @click="clearNewQuestion"
                  >
                    נקה
                  </button>
                </td>
              </tr>
              <tr
                v-for="(edge, index) in availableFeedbackQuestions.edges"
                :key="`name-${index}`"
              >
                <td class="row items-center">
                  <div v-if="!edge.node.isEdit">{{ edge.node.question }}</div>
                  <div v-if="edge.node.isEdit">
                    <input-field
                      id="question"
                      v-model="edge.node.question"
                      type="text"
                    />
                  </div>
                </td>
                <td class="row">
                  <div v-if="!edge.node.isEdit">
                    {{ edge.node.classification.label }}
                  </div>
                  <div v-if="edge.node.isEdit">
                    <multiselect
                      v-model="edge.node.classification"
                      :options="typeEditOptions"
                      :searchable="false"
                      :show-labels="false"
                      label="label"
                      track-by="classification"
                    >
                    </multiselect>
                  </div>
                </td>
                <td class="row">
                  <button
                    v-if="!edge.node.isEdit"
                    class="button blue-button"
                    @click="editOn(index)"
                  >
                    ערוך
                  </button>
                  <button
                    v-if="edge.node.isEdit"
                    class="button blue-button"
                    @click="editOn(index)"
                  >
                    שמור
                  </button>
                  <button
                    class="button red-button mt-2 lg:mt-0 lg:mr-2"
                    @click="deleteQuestion(index)"
                  >
                    מחק
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="isSmall">
            <div class="responsive-card flex flex-col items-stretch">
              <div>
                <label for="question_card"><strong>שאלה חדשה:</strong></label>
                <input-field
                  id="question_card"
                  v-model="newQuestion.question"
                  type="Text"
                  label="ניתן להוסיף שאלה חדשה כאן"
                />
              </div>
              <div>
                <label for="classification_card"><strong>סיווג:</strong></label>
                <multiselect
                  id="classification_card"
                  v-model="newQuestion.classification"
                  :options="typeEditOptions"
                  :searchable="false"
                  :show-labels="false"
                  label="label"
                  track-by="classification"
                >
                </multiselect>
              </div>
              <div>
                <button class="button green-button" @click="addQuestion">
                  הוסף
                </button>
                <button
                  class="button blue-button mr-2"
                  @click="clearNewQuestion"
                >
                  נקה
                </button>
              </div>
            </div>
            <div
              v-for="(edge, index) in availableFeedbackQuestions.edges"
              :key="`card-${index}`"
              class="responsive-card flex flex-col items-stretch"
            >
              <div v-if="edge.node.isEdit">
                <strong>שאלה:</strong>
                <input-field
                  id="question"
                  v-model="edge.node.question"
                  type="text"
                />
              </div>
              <div v-else>
                <strong>שאלה:</strong>
                {{ edge.node.question }}
              </div>
              <div v-if="edge.node.isEdit">
                <strong>סיווג שאלה:</strong>
                <multiselect
                  v-model="edge.node.classification"
                  :options="typeEditOptions"
                  :searchable="false"
                  :show-labels="false"
                  label="label"
                  track-by="classification"
                >
                </multiselect>
              </div>
              <div v-else>
                <strong>סיווג שאלה:</strong>
                {{ edge.node.classification.label }}
              </div>
              <div>
                <button
                  v-if="!edge.node.isEdit"
                  class="button blue-button"
                  @click="editOn(index)"
                >
                  ערוך
                </button>
                <button
                  v-if="edge.node.isEdit"
                  class="button blue-button"
                  @click="editOn(index)"
                >
                  שמור
                </button>
                <button
                  class="button red-button mr-2"
                  @click="deleteQuestion(index)"
                >
                  מחק
                </button>
              </div>
            </div>
          </div>
          <infinite-loading
            v-if="
              !$apollo.loading && availableFeedbackQuestions.edges.length > 0
            "
            :force-use-infinite-wrapper="true"
            @infinite="infiniteHandler"
          >
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
        </div>
      </div>
    </div>
    <floating-action-button />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import isSmallMixin from '@/mixins/small_width'
import availableFeedbackQuestions from '@/gql/availableFeedbackQuestions.gql'
import deleteQuestion from '@/gql/deleteQuestion.gql'
import editQuestion from '@/gql/editQuestion.gql'
import addQuestion from '@/gql/addQuestion.gql'
import { roleParser, showSuccessToast } from '@/utils'
import { DateTime } from 'luxon'

const classificationMapping = {
  A_1: {
    classification: '1',
    label: 'מרצה',
  },
  A_2: {
    classification: '2',
    label: 'מתרגל',
  },
  A_3: {
    classification: '3',
    label: 'קורס',
  },
}

export default {
  components: {
    Multiselect,
  },
  mixins: [isSmallMixin],
  data() {
    return {
      DateTime,
      typeOptions: [
        {
          classification: '',
          label: 'הכול',
        },
        ...Object.values(classificationMapping),
      ],
      typeEditOptions: Object.values(classificationMapping),
      selectedType: {
        classification: '',
        label: 'הכול',
      },
      perPage: 5,
      after: '',
      availableFeedbackQuestions: {
        edges: [],
        pageInfo: {},
      },
      newQuestion: {
        question: '',
        classification: { ...classificationMapping.A_1 },
      },
      keywords: '',
    }
  },
  apollo: {
    availableFeedbackQuestions: {
      query: availableFeedbackQuestions,
      variables() {
        return {
          after: '',
          perPage: this.perPage,
          keywords: this.keywords,
        }
      },
      update: (data) => {
        const serverData = { ...data.availableFeedbackQuestions }
        for (const edge of serverData.edges) {
          if (typeof edge.node.classification === 'string') {
            edge.node.classification = {
              ...classificationMapping[edge.node.classification],
            }
          }
          if (!('isEdit' in edge.node)) {
            edge.node.isEdit = false
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
    async editOn(index) {
      if (this.availableFeedbackQuestions.edges[index].node.isEdit) {
        await this.editQuestion(index)
        this.availableFeedbackQuestions.edges[index].node.isEdit = false
      } else {
        this.availableFeedbackQuestions.edges[index].node.isEdit = true
      }
    },
    async editQuestion(index) {
      const currentNode = this.availableFeedbackQuestions.edges[index].node
      await this.$apollo.mutate({
        mutation: editQuestion,
        variables: {
          input: {
            id: currentNode.id,
            questionText: currentNode.question,
            classification: currentNode.classification.classification,
          },
        },
      })
      showSuccessToast(this, 'השאלה עודכנה בהצלחה')
    },
    async deleteQuestion(index) {
      const { id } = this.availableFeedbackQuestions.edges[index].node
      await this.$apollo.mutate({
        mutation: deleteQuestion,
        variables: {
          id,
        },
      })
      showSuccessToast(this, 'השאלה נמחקה בהצלחה', null, () => {
        this.availableFeedbackQuestions.edges.splice(index, 1)
      })
    },
    infiniteHandler($state) {
      if (!this.availableFeedbackQuestions.pageInfo.hasNextPage) {
        $state.complete()
      } else {
        const nextPageCursor = this.availableFeedbackQuestions.pageInfo
          .endCursor
        this.$apollo.queries.availableFeedbackQuestions
          .fetchMore({
            query: availableFeedbackQuestions,
            variables: {
              perPage: this.perPage,
              after: nextPageCursor,
              keywords: this.keywords,
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              const newResult = { ...fetchMoreResult }
              newResult.availableFeedbackQuestions.edges = [
                ...prevResult.availableFeedbackQuestions.edges,
                ...fetchMoreResult.availableFeedbackQuestions.edges,
              ]
              return newResult
            },
          })
          .then(() => $state.loaded())
      }
    },
    async addQuestion() {
      await this.$apollo.mutate({
        mutation: addQuestion,
        variables: {
          input: {
            questionText: this.newQuestion.question,
            classification: this.newQuestion.classification.classification,
          },
        },
      })
      showSuccessToast(this, 'השאלה נוספה בהצלחה')
      this.$apollo.queries.availableFeedbackQuestions.refetch()
      this.clearNewQuestion()
    },
    clearNewQuestion() {
      this.newQuestion.question = ''
      this.newQuestion.classification = classificationMapping.A_1
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

.responsive-card div {
  @apply min-w-full;
}
</style>
