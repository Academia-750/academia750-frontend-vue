export default {
  name: 'GraphStatisticsTopics',
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
      }],
      chartOptions: {
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
          categories: ['Topic 1', 'Topic 15']
        },
        yaxis: {
          title: {
            text: 'Preguntas por tema'
          }
        },
        fill: {
          opacity: 1
        }/* ,
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            }
          }
        } */
      }
    }
  },
  mounted() {
    this.showChart = true
  }
}
