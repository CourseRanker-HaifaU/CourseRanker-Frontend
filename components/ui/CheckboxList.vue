<template>
  <section
    class="w-full p-4 border border-input-border border-solid rounded-lg shadow-lg"
  >
    <input-field
      id="search"
      v-model="keywords"
      label="חיפוש"
      type="text"
    ></input-field>
    <ul
      class="mt-2 overflow-y-scroll"
      :class="{
        'h-56': availableFeedbackQuestions.edges.length > 0,
        'h-auto': availableFeedbackQuestions.edges.length === 0,
      }"
    >
      <li
        v-for="{ node } in availableFeedbackQuestions.edges"
        :key="node.id"
        class="flex flex-row items-center my-2"
      >
        <input
          class="form-checkbox flex-shrink-0"
          type="checkbox"
          :checked="selectedIDs.includes(node.id)"
          @input="toggleSelected(node.id)"
        />
        <span class="mr-2 flex-wrap">{{ node.question }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import availableFeedbackQuestions from '@/gql/availableFeedbackQuestions.gql'

export default {
  props: {
    classification: {
      type: String,
      default: '1',
    },
    value: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      keywords: '',
      availableFeedbackQuestions: {
        edges: [],
      },
      selectedIDs: [],
    }
  },
  apollo: {
    availableFeedbackQuestions: {
      query: availableFeedbackQuestions,
      variables() {
        return {
          keywords: this.keywords,
          classification: this.classification,
        }
      },
      fetchPolicy: 'no-cache',
      throttle: 300,
      debounce: 300,
    },
  },
  watch: {
    value(oldVal, newVal) {
      this.selectedIDs = [...this.value]
    },
  },
  created() {
    this.selectedIDs = [...this.value]
  },
  methods: {
    toggleSelected(id) {
      const index = this.selectedIDs.indexOf(id)
      if (index === -1) {
        this.selectedIDs.push(id)
      } else {
        this.selectedIDs.splice(index, 1)
      }
      this.$emit('input', this.selectedIDs)
    },
  },
}
</script>
