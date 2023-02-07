import { mapState, mapMutations, mapActions } from 'vuex'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import footerProps from './component/footerProps'
//import GraphStatisticsTopics from '../../components/graphStatisticsTopics'
import PreviewTopicsWorstTests from '@/modules/statistics/components/previewTopicsWorstTests'
import GraphStatisticsTopicsDialog from '@/modules/statistics/components/graphStatisticsTopics/Dialog/graphStatisticsTopicsDialog'
import GraphStatisticsTopicsComponent from '@/modules/statistics/components/graphStatisticsTopics'

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
    PreviewTopicsWorstTests,
    GraphStatisticsTopicsDialog,
    GraphStatisticsTopicsComponent
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('student')
  },
  mounted () {
    this.topicsWorstDataInTestsStudent = []

    this.getTopicsWorstInTestsStudentApi()
  },
  data () {
    return {
      arrayCountsQuestionsCorrect: [],
      arrayCountsQuestionsWrong: [],
      arrayCountsQuestionsUnanswered: [],
      categoriesTopics: [],
      disabledButtonFetchRecord: false,
      topicsWorstDataInTestsStudent: []
    }
  },
  computed: {
    ...footerProps
  },
  methods: {
    ...mapActions('statisticsService', ['getTopicsWorstInTestsStudent']),
    showGraphTopicsToImproveInDialog () {
      this.$refs['GraphStatisticsTopicsToImproveDialogComponent'].showGraphStatisticsStudent = true
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
      // Los 5 temas a mejorar
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        const response = await this.getTopicsWorstInTestsStudent({})

        this.categoriesTopics = response.data.map((topic) => topic.topic_name)
        this.arrayCountsQuestionsCorrect = response.data.map((topic) => parseInt(topic.total_questions_correct))
        this.arrayCountsQuestionsWrong = response.data.map((topic) => parseInt(topic.total_questions_wrong))
        this.arrayCountsQuestionsUnanswered = response.data.map((topic) => parseInt(topic.total_questions_unanswered))

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
