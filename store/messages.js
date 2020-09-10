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
  setTrue(state) {
    state.welcomeShown = true
  },
  setFalse(state) {
    state.welcomeShown = false
  },
}

export const actions = {
  keepWelcomeState(context) {
    context.commit('changeWelcomeState')
    localStorage.setItem(SHOW_WELCOME_KEY, context.state.welcomeShown)
  },
  restoreFromLocalStorage(context) {
    if (localStorage.getItem(SHOW_WELCOME_KEY) === 'true') {
      context.commit('setTrue')
    } else {
      context.commit('setFalse')
    }
  },
}
