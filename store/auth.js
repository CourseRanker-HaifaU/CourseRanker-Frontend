import Cookies from 'js-cookie'

const TOKEN_COOKIE = 'token'
const EXPIRES_IN_COOKIE = 'expires-in'

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
    Cookies.remove(TOKEN_COOKIE)
    Cookies.remove(EXPIRES_IN_COOKIE)
  },
  login(context, { token, expiresIn }) {
    context.commit('setToken', {
      token,
      expiresIn,
    })
    const expiration = {
      expires: (expiresIn - Math.floor(Date.now() / 1000)) / (3600 * 24),
    }
    Cookies.set(TOKEN_COOKIE, token, expiration)
    Cookies.set(EXPIRES_IN_COOKIE, expiresIn, expiration)
  },
  initStateFromCookies(context) {
    if (Cookies.get(TOKEN_COOKIE) && Cookies.get(EXPIRES_IN_COOKIE)) {
      context.commit('setToken', {
        token: Cookies.get(TOKEN_COOKIE),
        expiresIn: Cookies.get(EXPIRES_IN_COOKIE),
      })
    }
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
    return (
      state.token != null && state.expiresIn > Math.floor(Date.now() / 1000)
    )
  },
}
