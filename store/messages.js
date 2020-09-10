const SHOW_WELCOME_KEY = 'welcome-shown'

export const state = () => ({
  welcomeShown: true,
})

export const getters = {
  welcomeState(state) {
    return state.welcomeShown
  },
}

export const mutations = {
  changeWelcomeState(state, welcomeShown) {
    state.welcomeShown = welcomeShown
  },
}

export const actions = {
  keepWelcomeState(context) {
    context.commit('changeWelcomeState', !context.state.welcomeShown)
    localStorage.setItem(SHOW_WELCOME_KEY, context.state.welcomeShown)
  },
  restoreFromLocalStorage(context) {
    context.commit(
      'changeWelcomeState',
      localStorage.getItem(SHOW_WELCOME_KEY) === 'true'
    )
  },
}
