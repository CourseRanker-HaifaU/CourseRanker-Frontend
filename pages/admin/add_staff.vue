<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="הוספת חבר סגל" back-button />
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
        הוסף
      </button>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import allUnits from '@/gql/allUnits.gql'
import addStaff from '@/gql/addStaff.gql'

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
  },
  methods: {
    async onSubmit() {
      await this.$apollo.mutate({
        mutation: addStaff,
        variables: {
          input: {
            firstName: this.staffFirstName,
            lastName: this.staffLastName,
            title: this.staffTitle.id,
            units: this.units.map((unit) => unit.id),
          },
        },
      })
      alert('נוסף בהצלחה!')
    },
  },
  apollo: {
    allUnits: {
      query: allUnits,
    },
  },
}
</script>
