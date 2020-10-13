<template>
  <div>
    <div
      v-if="!showError && courseData !== null"
      class="flex flex-col gap-y-10 mt-4 min-w-full items-stretch"
    >
      <h1 class="text-3xl font-bold ml-6">{{ courseData.name }}</h1>
      <div style="margin-bottom: 18px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
      </div>
      <div class="grid grid-flow-col grid-cols-4 grid-rows-2 gap-2">
        <div>
          <strong>חוג:</strong>
          <span>{{ courseData.unit.name }}</span>
        </div>
        <div>
          <strong>נקודות זכות:</strong>
          <span>{{ courseData.points }}</span>
        </div>
        <div>
          <strong>אופן הוראה:</strong>
          <span>{{ courseTypeToString(courseData.courseType) }}</span>
        </div>
        <div>
          <strong>קהל יעד:</strong>
          <span>{{ classificationToString(courseData.classification) }}</span>
        </div>
        <div>
          <strong>סוג קורס:</strong>
          <span>{{ courseData.compulsory ? 'חובה' : 'בחירה' }}</span>
        </div>
        <div class="flex flex-row items-baseline">
          <strong>דירוג ממוצע:</strong>
          <span>
            <rating :rating="courseData.averageRating" class="rating"></rating>
          </span>
        </div>
      </div>
      <div>
        <strong>קורסי קדם:</strong>
        <ul v-if="prerequisites.length > 0" class="list-disc pr-4">
          <li v-for="prereq in prerequisites" :key="prereq.id">
            <nuxt-link
              :to="prereq.link"
              class="underline text-primary hover:text-primary-hover"
            >
              {{ prereq.name }}
            </nuxt-link>
          </li>
        </ul>
        <span v-if="prerequisites.length === 0">ללא</span>
      </div>
      <div class="flex flex-row items-baseline">
        <strong>תגיות:</strong>
        <ul class="mr-2 flex flex-col md:flex-row">
          <li
            v-for="tag in courseData.tags.edges"
            :key="tag.node.id"
            class="p-2 bg-accent hover:bg-accent-hover text-white transition-all duration-200 ease-in rounded m-1"
          >
            {{ tag.node.name }}
          </li>
        </ul>
      </div>
      <div v-if="userIsAdmin">
        <nuxt-link
          :to="`/admin/course/${this.$route.params.id}`"
          class="button blue-button"
          tag="button"
        >
          עריכת קורס
        </nuxt-link>
        <button class="button red-button" @click="deleteCourse">
          מחיקת קורס
        </button>
      </div>
      <semester-box
        :data="dataWithShownProperty"
        @toggle-shown="toggleShown"
        @delete-course-semester="deleteCourseSemester"
      ></semester-box>
    </div>
    <error-message
      v-if="showError"
      :message="`לא נמצא קורס ${this.$route.params.id}.`"
    />
  </div>
</template>

<script>
import courseDetails from '@/gql/courseDetails.gql'
import deleteCourse from '@/gql/deleteCourse.gql'
import { mapGetters } from 'vuex'
import { showSuccessToast } from '@/utils'

export default {
  data() {
    return {
      courseData: null,
      hidden: [],
      showError: false,
    }
  },
  computed: {
    ...mapGetters({
      userIsAdmin: 'user_data/isAdmin',
    }),
    dataWithShownProperty() {
      if (this.courseData === null) {
        return []
      }
      const newData = this.courseData.coursesemesterSet.edges.map(
        (item, index) => {
          const newItem = { ...item }
          newItem.isShown = !this.hidden.includes(index)
          return newItem
        }
      )

      return newData
    },
    prerequisites() {
      if (this.courseData === null) {
        return []
      }
      const ret = this.courseData.prerequisites.edges.map((item) => {
        return {
          id: item.node.id,
          link: `/course/${item.node.id}`,
          name: item.node.name,
        }
      })
      return ret
    },
  },
  watch: {
    courseData() {
      this.hidden = []
    },
  },
  created() {
    this.$apollo
      .query({
        query: courseDetails,
        variables: {
          id: this.$route.params.id,
        },
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      })
      .then((response) => {
        this.courseData = response.data.courseDetails
        if (response.data.courseDetails === null) {
          this.showError = true
        }
      })
  },
  methods: {
    courseTypeToString(courseType) {
      const mapping = {
        CL: 'שיעור ותרגול',
        SE: 'סמינר',
        LA: 'מעבדה',
      }
      if (!(courseType in mapping)) {
        return ''
      }
      return mapping[courseType]
    },
    classificationToString(classification) {
      const mapping = {
        UN: 'חוג/פקולטה',
        ET: 'אתגר',
        ALL: 'כלל אוניברסיטאי',
      }
      if (!(classification in mapping)) {
        return ''
      }
      return mapping[classification]
    },
    toggleShown(index) {
      if (this.hidden.includes(index)) {
        this.hidden.splice(this.hidden.indexOf(index), 1)
      } else {
        this.hidden.push(index)
      }
    },
    async deleteCourse() {
      await this.$apollo.mutate({
        mutation: deleteCourse,
        variables: {
          id: this.$route.params.id,
        },
      })
      showSuccessToast(this, 'נמחק בהצלחה', '/')
    },
    deleteCourseSemester(index) {
      this.courseData.coursesemesterSet.edges.splice(index, 1)
    },
  },
}
</script>

<style scoped>
div span {
  @apply mr-2;
}
</style>
