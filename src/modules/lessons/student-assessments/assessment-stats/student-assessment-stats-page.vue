<template>
  <div>
    <Vtoolbar
      title="Estadísticas de Seguimiento Teórico"
      icon="mdi-chart-line"
      :back="true"
    />

    <v-container>
      <v-card>
        <v-card-title>
          <span>Filtro de Fechas</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="5">
              <v-menu
                ref="fromMenu"
                v-model="fromMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fromDateFormatted"
                    label="Desde"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    filled
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fromDate"
                  :first-day-of-week="1"
                  no-title
                  @change="onFromDateChange"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="5">
              <v-menu
                ref="toMenu"
                v-model="toMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="toDateFormatted"
                    label="Hasta"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    filled
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="toDate"
                  :first-day-of-week="1"
                  no-title
                  :min="fromDate"
                  @change="onToDateChange"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                color="primary"
                block
                :loading="loading"
                @click="loadStats"
              >
                Buscar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card v-if="chartData.length > 0" class="mt-4">
        <v-card-title>
          <span>Gráfico de Evaluaciones</span>
        </v-card-title>
        <v-card-text>
          <apexchart
            type="line"
            height="400"
            :options="chartOptions"
            :series="chartSeries"
            :loading="loading"
          ></apexchart>
        </v-card-text>
      </v-card>

      <v-card v-if="chartData.length > 0" class="mt-4">
        <v-card-title>
          <span>Lista de Evaluaciones</span>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="tableHeaders"
            :items="sortedTableData"
            :items-per-page="10"
            class="elevation-1"
            @click:row="goToAssessment"
          >
            <template v-slot:[`item.created_at`]="{ item }">
              {{ formatDate(item.created_at) }}
            </template>
            <template v-slot:[`item.mark`]="{ item }">
              <span v-if="item.mark !== null">
                {{ parseFloat(item.mark).toFixed(2) }}
              </span>
              <span v-else class="grey--text">-</span>
            </template>
            <template v-slot:[`item.average_mark`]="{ item }">
              <span v-if="item.average_mark !== null">
                {{ parseFloat(item.average_mark).toFixed(2) }}
              </span>
              <span v-else class="grey--text">-</span>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import AssessmentRepository from '@/services/AssessmentRepository'

export default {
  name: 'StudentAssessmentStatsPage',
  components: {
    Vtoolbar: () =>
      import(
        /* webpackChunkName: "Vtoolbar" */ '@/modules/resources/components/resources/toolbar'
      )
  },
  data() {
    // Default to last 3 months
    const toDate = moment().format('YYYY-MM-DD')
    const fromDate = moment().subtract(3, 'months').format('YYYY-MM-DD')

    return {
      fromDate,
      toDate,
      fromMenu: false,
      toMenu: false,
      loading: false,
      hasSearched: false,
      chartData: []
    }
  },
  computed: {
    fromDateFormatted() {
      return this.fromDate ? moment(this.fromDate).format('DD-MM-YYYY') : ''
    },
    toDateFormatted() {
      return this.toDate ? moment(this.toDate).format('DD-MM-YYYY') : ''
    },
    sortedTableData() {
      return [...this.chartData].sort((a, b) => {
        return moment(b.created_at).diff(moment(a.created_at))
      })
    },
    tableHeaders() {
      return [
        {
          text: 'Evaluación',
          value: 'assessment_name',
          sortable: true
        },
        {
          text: 'Fecha',
          value: 'created_at',
          sortable: true
        },
        {
          text: 'Mi Nota',
          value: 'mark',
          sortable: true
        },
        {
          text: 'Promedio',
          value: 'average_mark',
          sortable: true
        }
      ]
    },
    chartSeries() {
      if (this.chartData.length === 0) {
        return []
      }

      // Sort by date
      const sortedData = [...this.chartData].sort((a, b) => {
        return moment(a.created_at).diff(moment(b.created_at))
      })

      const userMarks = sortedData.map((item) =>
        item.mark !== null ? parseFloat(item.mark) : null
      )
      const averageMarks = sortedData.map((item) =>
        item.average_mark !== null ? parseFloat(item.average_mark) : null
      )

      return [
        {
          name: 'Mi Nota',
          data: userMarks
        },
        {
          name: 'Promedio',
          data: averageMarks
        }
      ]
    },
    chartOptions() {
      if (this.chartData.length === 0) {
        return {}
      }

      // Sort by date
      const sortedData = [...this.chartData].sort((a, b) => {
        return moment(a.created_at).diff(moment(b.created_at))
      })

      const categories = sortedData.map((item) => {
        const date = moment(item.created_at).format('DD-MM-YYYY')
        const name = item.assessment_name || 'Evaluación'

        return `${name}\n${date}`
      })

      return {
        chart: {
          type: 'line',
          height: 400,
          toolbar: {
            show: true
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          categories,
          title: {
            text: 'Fecha de Evaluación'
          },
          labels: {
            rotate: -45,
            rotateAlways: true
          }
        },
        yaxis: {
          title: {
            text: 'Nota'
          },
          min: 0,
          max: 10
        },
        legend: {
          position: 'top'
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        markers: {
          size: 4
        }
      }
    }
  },
  mounted() {
    // Load stats on mount with default dates
    this.loadStats()
  },
  methods: {
    onFromDateChange() {
      this.fromMenu = false
      // Ensure to date is not before from date
      if (this.toDate && moment(this.toDate).isBefore(this.fromDate)) {
        this.toDate = this.fromDate
      }
    },
    onToDateChange() {
      this.toMenu = false
    },
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    goToAssessment(item) {
      if (item.assessment_id) {
        this.$router.push({
          name: 'student-assessment-detail',
          params: { assessmentId: item.assessment_id }
        })
      }
    },
    async loadStats() {
      this.loading = true
      this.hasSearched = true

      try {
        const params = {
          from: this.fromDate,
          to: this.toDate
        }

        const data = await AssessmentRepository.getStatsByTime(params)

        this.chartData = data ?? []
      } catch (error) {
        console.error('Error loading stats:', error)
        this.chartData = []
      } finally {
        this.loading = false
      }
    }
  },
  head: {
    title: {
      inner: 'Seguimiento Teórico'
    }
  }
}
</script>

<style scoped>
::v-deep .v-data-table tbody tr {
  cursor: pointer;
}

::v-deep .v-data-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.04) !important;
}
</style>
