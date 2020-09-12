const SHOW_WELCOME_KEY = 'welcome-shown'
const SHOW_SEMESTER_KEY = 'semester-shown'

export const state = () => ({
  welcomeShown: true,
  semesterShown: true,
})

export const getters = {
  welcomeState(state) {
    return state.welcomeShown
  },
  semesterState(state) {
    return state.semesterShown
  },
}

export const mutations = {
  changeWelcomeState(state, welcomeShown) {
    state.welcomeShown = welcomeShown
  },
  changeSemesterState(state, semesterShown) {
    state.semesterShown = semesterShown
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
    context.commit(
      'changeSemesterState',
      localStorage.getItem(SHOW_SEMESTER_KEY) === 'true'
    )
  },
  keepSemesterState(context) {
    context.commit('changeSemesterState', !context.state.semesterShown)
    localStorage.setItem(SHOW_SEMESTER_KEY, context.state.semesterShown)
  },
}
