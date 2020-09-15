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

export const getSemester = ({ name, year }) => {
  const semesterName = name === 'A' ? 'א׳' : name === 'B' ? 'ב׳' : 'קיץ'

  return `${semesterName} ${year}`
}
