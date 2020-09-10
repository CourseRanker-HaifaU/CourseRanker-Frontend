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
  changeWelcomeState(state) {
    state.welcomeShown = !state.welcomeShown
  },
}

export const actions = {
  keepWelcomeState(context) {
    context.commit('changeWelcomeState')
    localStorage.setItem(SHOW_WELCOME_KEY, state.welcomeShown)
  },
  restoreFromLocalStorage(context) {
    if (localStorage.getItem(SHOW_WELCOME_KEY)) {
      context.commit('welcomeState')
    }
  },
}
