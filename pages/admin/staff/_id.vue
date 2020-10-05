<template>
  <div class="h-cover w-full text-center">
    <panel-page-title :title="pageTitle" back-button />
    <form class="min-w-full grid grid-cols-2 gap-4" @submit.prevent="onSubmit">
      <label for="staff-title" class="my-auto text-right">תואר:</label>
      <div id="staff-title">
        <multiselect
          v-model="staffTitle"
          :options="titles"
          :searchable="false"
          :show-labels="false"
          placeholder="בחר את תואר חבר הסגל"
          label="name"
          track-by="id"
        ></multiselect>
      </div>
      <label for="staff-first-name" class="my-auto text-right">שם פרטי:</label>
      <input-field
        id="staff-first-name"
        v-model="staffFirstName"
        type="text"
        class="text-right min-w-full"
      />
      <label for="staff-last-name" class="my-auto text-right">שם משפחה:</label>
      <input-field
        id="staff-last-name"
        v-model="staffLastName"
        type="text"
        class="text-right min-w-full"
      />
      <label for="unit" class="my-auto text-right"
        >יחידות (פקולטות או חוגים):
      </label>
      <div id="unit">
        <multiselect
          v-model="units"
          :options="allUnitsOptions"
          :searchable="true"
          :show-labels="false"
          :multiple="true"
          placeholder="בחר יחידה אחת או יותר"
          label="name"
          track-by="id"
        >
          <template v-slot:noResult>
            לא נמצאו יחידות התואמות את החיפוש
          </template>
        </multiselect>
      </div>
      <button
        id="addCourse"
        type="submit"
        class="focus:outline-none w-full button blue-button mt-4 col-span-2 md:col-span-1 md:col-start-2"
      >
        {{ buttonLabel }}
      </button>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import allUnits from '@/gql/allUnits.gql'
import addStaff from '@/gql/addStaff.gql'
import editStaff from '@/gql/editStaff.gql'
import editStaffDetails from '@/gql/editStaffDetails.gql'
import { showSuccessToast } from '@/utils'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      staffFirstName: '',
      staffLastName: '',
      titles: [
        {
          id: 'MR',
          name: 'מר',
        },
        {
          id: 'MS',
          name: "גב'",
        },
        {
          id: 'DR',
          name: 'ד"ר',
        },
        {
          id: 'PR',
          name: "פרופ'",
        },
      ],
      staffTitle: null,
      units: [],
      allUnits: {},
    }
  },
  computed: {
    allUnitsOptions() {
      if (!('edges' in this.allUnits)) {
        return []
      }
      return this.allUnits.edges.map((item) => item.node)
    },
    isEdit() {
      return !!this.$route.params.id
    },
    pageTitle() {
      return this.isEdit ? 'עריכת חבר סגל' : 'הוספת חבר סגל'
    },
    buttonLabel() {
      return this.isEdit ? 'שמור' : 'הוסף'
    },
  },
  created() {
    if (this.isEdit) {
      this.$apollo
        .query({
          query: editStaffDetails,
          variables: {
            id: this.$route.params.id,
          },
        })
        .then((res) => {
          const staffData = res.data.staff
          this.staffFirstName = staffData.firstName
          this.staffLastName = staffData.lastName
          this.staffTitle = this.titles.find(
            (item) => item.id === staffData.title
          )
          this.units = staffData.units.edges.map((item) => item.node)
        })
    }
  },
  methods: {
    async onSubmit() {
      const response = await this.$apollo.mutate({
        mutation: this.isEdit ? editStaff : addStaff,
        variables: {
          input: {
            id: this.$route.params.id,
            firstName: this.staffFirstName,
            lastName: this.staffLastName,
            title: this.staffTitle.id,
            units: this.units.map((unit) => unit.id),
          },
        },
      })
      const staffID = this.isEdit
        ? response.data.editStaff.staff.id
        : response.data.addStaff.staff.id
      showSuccessToast(
        this,
        this.isEdit ? 'נשמר בהצלחה' : 'נוסף בהצלחה',
        `/staff/${staffID}`
      )
    },
  },
  apollo: {
    allUnits: {
      query: allUnits,
    },
  },
}
</script>
