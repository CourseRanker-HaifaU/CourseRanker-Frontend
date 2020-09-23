<template>
  <div class="h-cover w-full text-right min-w-full">
    <panel-page-title title="הוספת סמסטר לקורס" back-button />
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
            :searchable="false"
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
            :searchable="false"
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
            :taggable="true"
            :hide-selected="true"
            :show-labels="false"
          ></multiselect>
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
            :taggable="true"
            :hide-selected="true"
            :show-labels="false"
            :loading="$apollo.loading"
          ></multiselect>
        </div>
        <button
          id="addCourse"
          type="submit"
          class="w-full button blue-button mt-4 col-start-2 focus:border-accent focus:shadow-outline"
        >
          הוסף
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import addSemesterToCourseData from '@/gql/addSemesterToCourseData.gql'
import openCourseInSemester from '@/gql/openCourseInSemester.gql'
import { getSemester, staffToString } from '@/utils'

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
      },
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
        mutation: openCourseInSemester,
        variables: {
          input: {
            courseId: this.selectedCourse.id,
            semesterId: this.selectedSemester.id,
            lecturerIds: this.getIds(this.selectedLecturers),
            otherStaffIds: this.getIds(this.selectedTeachingAssistants),
          },
        },
      })
      alert('נוסף בהצלחה!')
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
        return data
      },
    },
  },
}
</script>
