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
      showChart: false
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
          width: '100%',
          height: 350/* ,
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
          } */
        },
        legend: {
          position: 'top'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '90%',
            barHeight: '100%',
            endingShape: 'rounded',
            dataLabels: {
              position: 'center'
            }
          }
        },
        /* dataLabels: {
          enabled: false,
          offsetY: 500
        }, */
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: this.categoriesTopics,
          labels: {
            rotate: -85,
            maxHeight: 3000
          }
        },
        yaxis: {
          title: {
            text: 'Preguntas por tema'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return parseInt(val)
            }
          }
        }
      }
    }
  },
  mounted() {
    this.showChart = true
  }
}
