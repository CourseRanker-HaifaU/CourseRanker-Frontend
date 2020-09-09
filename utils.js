import login from '@/gql/login.gql'

export const calculateExpiresIn = (timestamp) =>
  (timestamp - Math.floor(Date.now() / 1000)) / (3600 * 24)

export async function userLogin(vueInstance, email, password) {
  try {
    const res = await vueInstance.$apollo.mutate({
      mutation: login,
      variables: {
        email,
        password,
      },
    })
    await vueInstance.$apolloHelpers
      .onLogin(res.data.login.token, undefined, {
        expires: calculateExpiresIn(res.data.login.refreshExpiresIn),
      })
      .then(() => {
        window.location = '/'
      })
  } catch (error) {
    vueInstance.$nuxt.error({
      statusCode: 401,
      message: error.graphQLErrors[0].message,
    })
  }
}
