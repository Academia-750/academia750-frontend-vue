import { mapState, mapMutations, mapActions } from 'vuex'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import footerProps from './component/footerProps'
import selectTopicsByDatatable from '../../components/selectTopicsByDatatable'
import QuestionsWrongByTopic from '../../components/QuestionsWrongByTopic'
//import GraphStatisticsTopics from '../../components/graphStatisticsTopics'
import PreviewTopicsWorstTests from '../../components/previewTopicsWorstTests'
import GraphStatisticsTopicsDialog from '@/modules/statistics/components/graphStatisticsTopics/Dialog/graphStatisticsTopicsDialog'

export default {
  mixins: [URLBuilderResources, headersOppositionsTable, computedDatatable, componentButtonsCrud],
  components: {
    ResourceButtonEdit: () => import(/* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'),
    ResourceButtonDelete: () => import(/* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'),
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'),
    ResourceTextFieldSearch: () => import(/* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'),
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceBannerNoDataDatatable: () => import(/* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    ResourceDialogConfirmDelete: () => import(/* webpackChunkName: "ResourceDialogConfirmDelete" */ '@/modules/resources/components/resources/ResourceDialogConfirmDelete'),
    selectTopicsByDatatable,
    //GraphStatisticsTopics,
    QuestionsWrongByTopic,
    PreviewTopicsWorstTests,
    GraphStatisticsTopicsDialog
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('student')
  },
  mounted () {
    this.topicsWorstDataInTestsStudent = []

    this.SET_ITEMS_DATATABLE_QUESTIONS_WRONG([])

    this.getTopicsWorstInTestsStudentApi()
  },
  data () {
    return {
      topicsSelectedData: [],
      period: 'last-month',
      arrayCountsQuestionsCorrect: [],
      arrayCountsQuestionsWrong: [],
      arrayCountsQuestionsUnanswered: [],
      categoriesTopics: [],
      topicSelectedForQueryQuestionsWrong: null,
      periodsSelectForm: [
        { label: 'Total', key: 'total' },
        { label: 'Último mes', key: 'last-month' },
        { label: 'Últimos 3 meses', key: 'last-three-months' }
      ],
      disabledButtonFetchRecord: false,
      topicsWorstDataInTestsStudent: []
    }
  },
  computed: {
    ...mapState('statisticsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps
  },
  watch: {
    optionsDatatable: {
      handler () {
        this.getHistoryTestsCompletedByStudent({
          params: this.buildQueryParamsRequest()
        })
      },
      deep: true
    },
    topicSelectedForQueryQuestionsWrong: {
      handler () {
        this.$refs['QuestionsWrongByTopic'].topic_id = this.topicSelectedForQueryQuestionsWrong?.id
      },
      deep: true
    }
    /* ,
    topicsSelectedData: {
      handler () {
        console.log('dsdioshgiusoiug')
        this.getHistoryStatisticsDataGraphApi()
      },
      deep: true
    } */
  },
  methods: {
    ...mapMutations('statisticsService', ['SET_ITEMS_DATATABLE_QUESTIONS_WRONG']),
    ...mapActions('statisticsService', ['getHistoryStatisticsDataGraph', 'getTopicsWorstInTestsStudent']),
    getHistoryStatisticsQuestionsFailedTests () {
      if (!this.topicSelectedForQueryQuestionsWrong) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, seleccione 1 tema',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      this.$refs['QuestionsWrongByTopic'].loadDatatatable()
    },
    getHistoryStatisticsDataGraphApiAction () {

      if (Array.isArray(this.topicsSelectedData) && this.topicsSelectedData.length === 0) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, seleccione al menos 1 tema',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      if (Array.isArray(this.topicsSelectedData) && this.topicsSelectedData.length > 5) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Máximo 5 temas',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      if (!this.period) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, seleccione un periodo válido',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      this.getHistoryStatisticsDataGraphApi()
    },
    async getHistoryStatisticsDataGraphApi () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonFetchRecord = true

        const response = await this.getHistoryStatisticsDataGraph({
          data: {
            topics_id: this.topicsSelectedData.map((topic) => topic.id),
            period: this.period
          },
          config: {}
        })

        this.categoriesTopics = response.data.data.map((topic) => topic.topic.name)
        this.arrayCountsQuestionsCorrect = response.data.data.map((topic) => parseInt(topic.correct))
        this.arrayCountsQuestionsWrong = response.data.data.map((topic) => parseInt(topic.wrong))
        this.arrayCountsQuestionsUnanswered = response.data.data.map((topic) => parseInt(topic.unanswered))

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonFetchRecord = false

        this.$refs['GraphStatisticsTopicsDialogComponent'].showGraphStatisticsStudent = true

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonFetchRecord = false
      }
    },
    async getTopicsWorstInTestsStudentApi () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        const response = await this.getTopicsWorstInTestsStudent({})

        this.topicsWorstDataInTestsStudent = response.data

        this.$loadingApp.disabledLoadingProgressLinear()

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
      }
    }
  },
  head: {
    title: {
      inner: 'Mi resumen'
    }
  }
}
