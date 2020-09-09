const SHOW_WELCOME_KEY = 'welcome-shown'

export const state = () => ({
  welcomeShown: false,
})

export const getters = {
  showWelcome(state) {
    return !state.welcomeShown
  },
}

export const mutations = {
  closeWelcome(state) {
    state.welcomeShown = true
  },
}

export const actions = {
  closeWelcome(context) {
    context.commit('closeWelcome')
    localStorage.setItem(SHOW_WELCOME_KEY, true)
  },
  restoreFromLocalStorage(context) {
    if (localStorage.getItem(SHOW_WELCOME_KEY)) {
      context.commit('closeWelcome')
    }
  },
}
