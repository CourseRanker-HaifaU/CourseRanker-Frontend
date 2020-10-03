<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    examEdges: {
      type: Array,
      required: true,
    },
  },
  computed: {
    arrayWithLabels() {
      const availableColors = ['#0664aa', '#d51111', '#00ab0c']
      const labels = [
        '0-10',
        '11-20',
        '21-30',
        '31-40',
        '41-50',
        '51-60',
        '61-70',
        '71-80',
        '81-90',
        '+91',
      ]
      const datasets = this.examEdges.map(({ node }, index) => ({
        label: node.moed,
        data: node.histogram,
        backgroundColor: availableColors[index],
      }))
      return {
        labels,
        datasets,
      }
    },
  },
  mounted() {
    this.renderChart(this.arrayWithLabels, {
      responsive: true,
      maintainAspectRatio: false,
    })
  },
}
</script>
