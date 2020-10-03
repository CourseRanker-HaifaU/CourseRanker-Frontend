export const state = () => ({
  filterTags: [],
  isCompulsory: undefined,
  keywords: '',
})

export const getters = {
  filterTags(state) {
    return state.filterTags
  },
  isCompulsory(state) {
    return state.isCompulsory
  },
  keywords(state) {
    return state.keywords
  },
}

export const mutations = {
  addTag(state, name) {
    if (!state.filterTags.includes(name)) {
      state.filterTags.push(name)
    }
  },
  deleteTag(state, index) {
    state.filterTags.splice(index, 1)
  },
  changeKeywords(state, keywords) {
    state.keywords = keywords
  },
}
