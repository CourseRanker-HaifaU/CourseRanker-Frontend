import login from '@/gql/login.gql'

export const calculateExpiresIn = (timestamp) =>
  (timestamp - Math.floor(Date.now() / 1000)) / (3600 * 24)

export async function userLogin(vueInstance, email, password) {
  try {
    const res = await vueInstance.$apollo.mutate({
      mutation: login,
      variables: {
        input: {
          email,
          password,
        },
      },
    })
    const userData = res.data.login.user
    const expiresIn = calculateExpiresIn(res.data.login.refreshExpiresIn)
    vueInstance.$store.dispatch('user_data/onLogin', {
      userData,
      expiresIn,
    })
    await vueInstance.$apolloHelpers
      .onLogin(res.data.login.token, undefined, {
        expires: expiresIn,
      })
      .then(() => {
        // window.location = '/'
      })
  } catch (error) {
    vueInstance.$nuxt.error({
      statusCode: 401,
      message: error.graphQLErrors[0].message,
    })
  }
}

export const staffToString = ({ firstName, lastName, title }) => {
  const titleMapping = {
    DR: 'ד״ר',
    PR: 'פרופ׳',
    MR: 'מר',
    MS: 'גב׳',
  }

  if (!(title in titleMapping)) {
    return ''
  }

  return `${titleMapping[title]} ${firstName} ${lastName}`
}

export const multipleStaffToString = (arr) => {
  return arr.map((item) => staffToString(item.node)).join(', ')
}

export const getSemester = ({ name, yearJewish }) => {
  const semesterName = name === 'A' ? 'א׳' : name === 'B' ? 'ב׳' : 'קיץ'

  return `${semesterName} ${yearJewish}`
}
