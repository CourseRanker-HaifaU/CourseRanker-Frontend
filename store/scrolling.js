export const state = () => ({
  scrollY: window.scrollY,
})

export const getters = {
  scrolled(state) {
    return state.scrollY !== 0
  },
  scrollY(state) {
    return state.scrollY
  },
}

export const mutations = {
  changeScrolled(state, scrollY) {
    state.scrollY = scrollY
  },
}

export const actions = {
  changeScrolled(context) {
    if (
      (context.state.scrollY === 0 && window.scrollY === 0) ||
      (context.state.scrollY !== 0 && window.scrollY !== 0)
    ) {
      return
    }
    context.commit('changeScrolled', window.scrollY)
  },
}
