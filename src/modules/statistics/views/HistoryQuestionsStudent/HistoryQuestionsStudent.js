import { mapState, mapMutations, mapActions } from 'vuex'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import { PermissionEnum } from '@/utils/enums'
import SelectTestsByDatatable from '../../components/SelectTestsByDatatable'
import ItemQuestionHistoryTest from '@/modules/tests/components/HistoryTest/ItemQuestionHistoryTest'

export default {
  mixins: [
    URLBuilderResources,
    headersOppositionsTable,
    computedDatatable,
    componentButtonsCrud
  ],
  components: {
    ResourceButtonEdit: () =>
      import(
        /* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'
      ),
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      ),
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceDividerTitleDatatable: () =>
      import(
        /* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      ),
    ResourceDialogConfirmDelete: () =>
      import(
        /* webpackChunkName: "ResourceDialogConfirmDelete" */ '@/modules/resources/components/resources/ResourceDialogConfirmDelete'
      ),
    SelectTestsByDatatable,
    ItemQuestionHistoryTest
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.GENERATE_TESTS)
  },
  mounted() {},
  data() {
    return {
      pageNumber: 1,
      numberItemsPerPage: 15,
      totalNumberPages: 0,
      questionDataHistoryState: [],
      questionDataHistory: [],
      periodSelected: 'all',
      typeQuestionSelected: 'correct',
      testSelected: null,
      periodsSelectForm: [
        { label: 'Total', key: 'all' },
        { label: 'Último mes', key: 'last-month' },
        { label: 'Últimos 3 meses', key: 'last-three-months' }
      ],
      typeQuestionsSelectForm: [
        { label: 'Acertadas', key: 'correct' },
        { label: 'Incorrectas', key: 'wrong' },
        { label: 'No respondidas', key: 'unanswered' }
      ],
      disabledButtonFetchRecord: false
    }
  },
  watch: {
    periodSelected: {
      handler() {
        this.$refs['TestsByPeriodDatatable'].period_key = this.periodSelected
        this.$refs['TestsByPeriodDatatable'].loadDatatatable()
      },
      deep: true
    },
    pageNumber(number) {
      this.fetchRecordData()
    }
  },
  methods: {
    ...mapActions('statisticsService', ['getQuestionsByTestAndTypeQuestion']),
    getTotalNumberPages(response) {
      return Math.ceil(response.data.meta.total / response.data.meta.per_page)
    },
    async fetchRecordData() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        if (!this.testSelected) {
          this.$loadingApp.disabledLoadingProgressLinear()

          return
        }

        if (!this.typeQuestionSelected) {
          this.$loadingApp.disabledLoadingProgressLinear()

          return
        }

        await this.getQuestionsByTestAndTypeQuestion({
          test_id: this.testSelected?.id,
          type_question: this.typeQuestionSelected,
          config: {
            params: {
              'page[size]': this.numberItemsPerPage,
              'page[number]': this.pageNumber
            }
          }
        }).then((response) => {
          this.totalNumberPages = this.getTotalNumberPages(response)
          this.testData = response.data.meta.test
          this.questionDataHistory = response.data.data
          this.questionDataHistoryState = response.data.meta.questions_data
        })

        this.$loadingApp.disabledLoadingProgressLinear()
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
      }
    }
  },
  head: {
    title: {
      inner: 'Histórico de preguntas'
    }
  }
}
