export const state = () => ({
  token: null,
  expiresIn: null,
})
export const mutations = {
  setToken(state, { token, expiresIn }) {
    state.token = token
    state.expiresIn = expiresIn
  },
}
export const actions = {}

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
