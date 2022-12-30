export default {
  name: 'GraphStatisticsTopics',
  props: {
    arrayCountsQuestionsCorrect: {
      type: Array,
      required: true
    },
    arrayCountsQuestionsWrong: {
      type: Array,
      required: true
    },
    arrayCountsQuestionsUnanswered: {
      type: Array,
      required: true
    },
    categoriesTopics: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showChart: false,
      series: [{
        name: 'Correctas',
        color: '#26A69A',
        data: [10, 10]
      }, {
        name: 'Incorrectas',
        data: [10, 15],
        color: '#D32F2F'
      }, {
        name: 'No respondidas',
        color: '#D0B838',
        data: [5, 16]
      }]
    }
  },
  computed: {
    getSeriesGraph () {
      return [{
        name: 'Correctas',
        color: '#26A69A',
        data: this.arrayCountsQuestionsCorrect
      }, {
        name: 'Incorrectas',
        data: this.arrayCountsQuestionsWrong,
        color: '#D32F2F'
      }, {
        name: 'No respondidas',
        color: '#D0B838',
        data: this.arrayCountsQuestionsUnanswered
      }]
    },
    getChartOptions () {
      return {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            export: {
              csv: {
                title: 'Descargar gráfico SVG' // Título del botón
              },
              png: {
                title: 'Descargar gráfico PNG' // Título del botón
              },
              svg: {
                title: 'Descargar datos CSV' // Título del botón
              }
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '90%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: this.categoriesTopics
        },
        yaxis: {
          title: {
            text: 'Preguntas por tema'
          }
        },
        fill: {
          opacity: 1
        }
      }
    }
  },
  mounted() {
    this.showChart = true
  }
}