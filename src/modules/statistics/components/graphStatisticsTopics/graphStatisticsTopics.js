export default {
  name: 'GraphStatisticsTopics',
  data() {
    return {
      showChart: false,
      series: [{
        name: 'Correctas',
        color: '#26A69A',
        data: [44, 55]
      }, {
        name: 'Incorrectas',
        data: [76, 85],
        color: '#D32F2F'
      }, {
        name: 'No respondidas',
        color: '#D0B838',
        data: [35, 41]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
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
          categories: ['Feb', 'Mar']
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
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
