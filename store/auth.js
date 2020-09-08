export const state = () => ({
  token: null,
  expiresIn: null,
})
export const mutations = {
  setToken(state, { token, expiresIn }) {
    state.token = token
    state.expiresIn = expiresIn
  },
  clearToken(state) {
    state.token = null
    state.expiresIn = null
  },
}
export const actions = {
  logOut(context) {
    context.commit('clearToken')
  },
}

export const getters = {
  token(state) {
    return state.token
  },
  expiresIn(state) {
    return state.expiresIn
  },
  isLoggedIn(state) {
    return state.token != null
  },
}
