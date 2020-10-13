<template>
  <div class="h-cover w-full text-right min-w-full">
    <panel-page-title :title="pageTitle" back-button />
    <div v-if="serverData != null" class="mx-4 md:max-w-md min-w-full">
      <form
        class="grid grid-cols-2 gap-8 text-right grid-flow-row"
        @submit.prevent="onSubmit"
      >
        <label for="course">בחר קורס:</label>
        <div id="course">
          <multiselect
            v-model="selectedCourse"
            :options="serverData.allCourses.edges"
            :show-labels="false"
            placeholder="בחר קורס"
            label="name"
            track-by="id"
            :loading="$apollo.loading"
          ></multiselect>
        </div>
        <label for="selectedSemester">בחר שנה וסמסטר:</label>
        <div id="selectedSemester">
          <multiselect
            v-model="selectedSemester"
            :options="serverData.allSemesters.edges"
            :show-labels="false"
            placeholder="בחר שנה וסמסטר"
            label="name"
            track-by="id"
            :loading="$apollo.loading"
          ></multiselect>
        </div>
        <label for="selectedLecturers">בחר מרצים:</label>
        <div id="selectedLecturers">
          <multiselect
            v-model="selectedLecturers"
            tag-placeholder="בחר מרצים"
            placeholder="חפש מרצה"
            label="name"
            track-by="id"
            :loading="$apollo.loading"
            :options="serverData.allStaff.edges"
            :multiple="true"
            :hide-selected="true"
            :show-labels="false"
          >
            <template v-slot:noResult>
              לא נמצאו חברי סגל התואמים את החיפוש
            </template>
          </multiselect>
        </div>
        <label for="selectedTeachingAssistants">בחר מתרגלים:</label>
        <div id="selectedTeachingAssistants">
          <multiselect
            v-model="selectedTeachingAssistants"
            tag-placeholder="בחר מתרגלים"
            placeholder="חפש מתרגל/ת"
            label="name"
            track-by="id"
            :options="serverData.allStaff.edges"
            :multiple="true"
            :hide-selected="true"
            :show-labels="false"
            :loading="$apollo.loading"
          >
            <template v-slot:noResult>
              לא נמצאו חברי סגל התואמים את החיפוש
            </template>
          </multiselect>
        </div>
        <label for="selectedFeedbackForm">בחר טופס חוות דעת למילוי:</label>
        <div id="selectedFeedbackFrom">
          <multiselect
            v-model="selectedFeedbackForm"
            tag-placeholder="בחר טופס חוות דעת"
            placeholder="חפש טופס"
            label="label"
            track-by="id"
            :options="serverData.allFeedbackForms.edges"
            :hide-selected="true"
            :show-labels="false"
            :loading="$apollo.loading"
          >
            <template v-slot:noResult>
              לא נמצאו טפסים התואמים את החיפוש
            </template>
          </multiselect>
        </div>
        <button
          id="addCourse"
          type="submit"
          class="w-full button blue-button mt-4 col-start-2 focus:border-accent focus:shadow-outline"
        >
          {{ isEdit ? 'שמור' : 'הוסף' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import addSemesterToCourseData from '@/gql/addSemesterToCourseData.gql'
import openCourseInSemester from '@/gql/openCourseInSemester.gql'
import updateCourseInSemester from '@/gql/updateCourseInSemester.gql'
import courseSemesterDetails from '@/gql/courseSemesterDetails.gql'
import { getSemester, staffToString, showSuccessToast } from '@/utils'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedCourse: null,
      selectedSemester: null,
      selectedLecturers: [],
      selectedTeachingAssistants: [],
      selectedFeedbackForm: null,
      serverData: {
        allCourses: {
          edges: [],
        },
        allStaff: {
          edges: [],
        },
        allSemesters: {
          edges: [],
        },
        allFeedbackForms: {
          edges: [],
        },
      },
    }
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id
    },
    pageTitle() {
      return this.isEdit ? 'עריכת קורס בסמסטר' : 'הוספת סמסטר לקורס'
    },
  },
  created() {
    if (this.isEdit) {
      this.$apollo
        .query({
          query: courseSemesterDetails,
          variables: {
            id: this.$route.params.id,
          },
          fetchPolicy: 'no-cache',
        })
        .then((response) => {
          const results = response.data.courseSemesterDetails
          this.selectedCourse = results.course
          this.selectedSemester = {
            id: results.semester.id,
            name: getSemester(results.semester),
          }
          const {
            lecturers,
            teachingAssistants,
          } = results.coursesemesterstaffSet.edges[0].node
          this.selectedLecturers = lecturers.edges.map(({ node }) => ({
            id: node.id,
            name: staffToString(node),
          }))
          this.selectedTeachingAssistants = teachingAssistants.edges.map(
            ({ node }) => ({
              id: node.id,
              name: staffToString(node),
            })
          )
          this.selectedFeedbackForm = results.feedbackformcoursesemesterSet.edges.map(
            ({ node }) => ({
              id: node.feedbackForm.id,
              label: node.feedbackForm.label,
            })
          )[0]
        })
    }
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    getIds(array) {
      return array.map((item) => item.id)
    },
    async onSubmit() {
      await this.$apollo.mutate({
        mutation: this.isEdit ? updateCourseInSemester : openCourseInSemester,
        variables: {
          input: {
            id: this.$route.params.id,
            courseId: this.selectedCourse.id,
            semesterId: this.selectedSemester.id,
            lecturerIds: this.getIds(this.selectedLecturers),
            otherStaffIds: this.getIds(this.selectedTeachingAssistants),
            feedbackFormIds: [this.selectedFeedbackForm.id],
          },
        },
      })
      showSuccessToast(
        this,
        this.isEdit ? 'עודכן בהצלחה!' : 'נוסף בהצלחה!',
        `/course/${this.selectedCourse.id}`
      )
    },
  },
  apollo: {
    serverData: {
      query: addSemesterToCourseData,
      update: (data) => {
        data.allCourses.edges = data.allCourses.edges.map((item) => {
          if (!('node' in item)) {
            return item
          }
          return item.node
        })
        data.allSemesters.edges = data.allSemesters.edges.map((item) => {
          if (!('node' in item)) {
            return item
          }
          return {
            id: item.node.id,
            name: getSemester(item.node),
          }
        })
        data.allStaff.edges = data.allStaff.edges.map((item) => {
          if (!('node' in item)) {
            return item
          }
          return {
            id: item.node.id,
            name: staffToString(item.node),
          }
        })
        data.allFeedbackForms.edges = data.allFeedbackForms.edges.map(
          (item) => {
            if (!('node' in item)) {
              return item
            }
            return {
              id: item.node.id,
              label: item.node.label,
            }
          }
        )
        return data
      },
    },
  },
}
</script>
