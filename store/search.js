import allTags from '@/gql/allTags.gql'
import { XOR } from '@/utils'

export const state = () => ({
  selectedTags: [],
  availableTags: [],
  keywords: '',
})

export const getters = {
  selectedTags(state) {
    return state.selectedTags
  },
  isCompulsory(state) {
    if (
      XOR(
        state.selectedTags.includes('קורסי חובה'),
        state.selectedTags.includes('קורסי בחירה')
      )
    ) {
      return state.selectedTags.includes('קורסי חובה')
    } else {
      return undefined
    }
  },
  keywords(state) {
    return state.keywords
  },
  filterTags(state) {
    if (state.availableTags.length === 0) {
      return state.availableTags
    }
    return state.selectedTags
      .filter((item) => item !== 'קורסי בחירה' && item !== 'קורסי חובה')
      .map(
        (label) => state.availableTags.find((item) => item.name === label).id
      )
  },
  availableTags(state) {
    return state.availableTags
  },
}

export const mutations = {
  addTag(state, name) {
    if (!state.selectedTags.includes(name)) {
      state.selectedTags.push(name)
    }
  },
  deleteTag(state, index) {
    state.selectedTags.splice(index, 1)
  },
  changeKeywords(state, keywords) {
    state.keywords = keywords
  },
  setAvailableTags(state, tags) {
    state.availableTags = tags
  },
  setIsCompulsory(state, isCompulsory) {
    state.isCompulsory = isCompulsory
  },
  clearSelectedTags(state) {
    state.selectedTags = []
  },
}

export const actions = {
  async initTagsList(context, vueInstance) {
    await vueInstance.$apollo
      .query({
        query: allTags,
      })
      .then((response) => {
        context.commit(
          'setAvailableTags',
          response.data.allTags.edges.map((item) => item.node)
        )
      })
  },
}
