<template>
  <div
    v-if="courseData !== null"
    class="flex flex-col gap-y-10 mt-4 min-w-full items-stretch"
  >
    <h1 class="text-3xl font-bold ml-6">{{ courseData.name }}</h1>
    <div style="margin-bottom: 18px">
      <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
    </div>
    <div class="grid grid-flow-col grid-cols-4 grid-rows-2 gap-2 mb-10">
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
    <semester-box
      :data="dataWithShownProperty"
      @toggle-shown="toggleShown"
    ></semester-box>
  </div>
</template>

<script>
import courseDetails from '@/gql/courseDetails.gql'

export default {
  data() {
    return {
      courseData: null,
      hidden: [],
    }
  },
  apollo: {
    courseData: {
      query: courseDetails,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
      update: (data) => {
        return data.courseDetails
      },
    },
  },
  computed: {
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
  },
  watch: {
    courseData() {
      this.hidden = []
    },
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
  },
}
</script>

<style scoped>
div span {
  @apply mr-2;
}
</style>
