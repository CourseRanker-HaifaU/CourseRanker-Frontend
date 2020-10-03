import Cookies from 'js-cookie'

const USER_DATA_COOKIE_KEY = 'user_data'

export const state = () => ({
  userData: null,
})

export const getters = {
  isAdmin(state) {
    return state.userData !== null && state.userData.role !== 'A_1'
  },
  fullName(state) {
    return `${state.userData.firstName} ${state.userData.lastName}`
  },
}

export const mutations = {
  setUserData(state, userData) {
    state.userData = userData
  },
}

export const actions = {
  onLogin(context, { userData, expiresIn }) {
    context.commit('setUserData', userData)
    Cookies.set(USER_DATA_COOKIE_KEY, userData, { expires: expiresIn })
  },
  restoreState(context) {
    const cookie = Cookies.get(USER_DATA_COOKIE_KEY)
    if (typeof cookie !== 'undefined') {
      context.commit('setUserData', JSON.parse(cookie))
    }
  },
  clearData(context) {
    context.commit('setUserData', null)
    Cookies.remove(USER_DATA_COOKIE_KEY)
  },
}
