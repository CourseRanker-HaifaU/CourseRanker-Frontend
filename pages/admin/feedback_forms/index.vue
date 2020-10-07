<template>
  <div class="w-full text-center">
    <panel-page-title title="שאלונים" back-button />
    <nuxt-link
      tag="button"
      class="button blue-button mb-2"
      to="/admin/feedback_forms/editor"
    >
      יצירת שאלון חדש
    </nuxt-link>
    <table class="min-w-full w-full leading-normal text-right">
      <thead>
        <tr>
          <th class="column-title rounded-tr-lg">כותרת</th>
          <th class="column-title rounded-tl-lg">תאריך יצירה</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="edge in allFeedbackForms.edges"
          :key="edge.node.id"
          class="row"
          @click="$router.push(`/admin/feedback_forms/editor/${edge.node.id}`)"
        >
          <td>{{ edge.node.label }}</td>
          <td>
            {{ getDate(edge.node.timeCreated) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import allFeedbackForms from '@/gql/allFeedbackForms.gql'
import { getDate } from '@/utils'

export default {
  data() {
    return {
      allFeedbackForms: {
        edges: [],
      },
    }
  },
  apollo: {
    allFeedbackForms: {
      query: allFeedbackForms,
    },
  },
  methods: {
    getDate,
  },
}
</script>
