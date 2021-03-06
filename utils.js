import login from '@/gql/login.gql'
import { DateTime } from 'luxon'

export const calculateExpiresIn = (timestamp) =>
  (timestamp - Math.floor(Date.now() / 1000)) / (3600 * 24)

const TOAST_LENGTH = 4000

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
        window.location = '/'
      })
  } catch (error) {
    vueInstance.$nuxt.error({
      statusCode: 401,
      message: error,
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

export const mergeCurrentSemesterCoursesData = (oldData, newData) => {
  const ret = { ...newData }
  ret.__typename = oldData.__typename
  ret.allCourses.edges = [...oldData.allCourses.edges, ...ret.allCourses.edges]
  return ret
}

export const currentSemesterCourseDataTransform = (data) => {
  const allCourses = data.allCourses.edges
  const dataArray = []
  const { endCursor, hasNextPage } = data.allCourses.pageInfo
  for (const course of allCourses) {
    dataArray.push(course.node)
  }
  return {
    dataArray,
    endCursor,
    hasNextPage,
  }
}

export const myCoursesDataTransform = (data) => {
  const allData = data.currentUser.userCourses
  const dataArray = allData.edges.map((item) => item.node)
  const { endCursor, hasNextPage } = allData.pageInfo
  return {
    dataArray,
    endCursor,
    hasNextPage,
  }
}

export const mergeMyCoursesData = (oldData, newData) => {
  const ret = {
    ...newData,
  }
  ret.__typename = oldData.__typename
  ret.currentUser.userCourses.edges = [
    ...oldData.currentUser.userCourses.edges,
    ...newData.currentUser.userCourses.edges,
  ]
  return ret
}

export const roleParser = (toParse) => {
  switch (toParse) {
    case 'A_1':
      return 'משתמש'
    case 'A_2':
      return 'עורך תוכן'
    case 'A_3':
      return 'מנהל'
    default:
      return toParse
  }
}

export const XOR = (a, b) => {
  return (a || b) && !(a && b)
}

export const showSuccessToast = (
  vm,
  message,
  link = null,
  onCompleteHook = null
) => {
  vm.$toast.success(message, {
    position: 'bottom-left',
    duration: TOAST_LENGTH,
    onComplete: () => {
      if (onCompleteHook !== null) {
        onCompleteHook()
      }
      if (link !== null) {
        vm.$router.push(link)
      }
    },
  })
}

export const showErrorToast = (
  vm,
  message,
  link = null,
  onCompleteHook = null
) => {
  vm.$toast.error(message, {
    position: 'bottom-left',
    duration: TOAST_LENGTH,
    onComplete: () => {
      if (onCompleteHook !== null) {
        onCompleteHook()
      }
      if (link !== null) {
        vm.$router.push(link)
      }
    },
  })
}

export const getDate = (date) =>
  DateTime.fromISO(date).setLocale('he').toLocaleString(DateTime.DATE_SHORT)

export const trimLength = (message, length = 40) =>
  message.slice(0, length) + (message.length > length ? '...' : '')
