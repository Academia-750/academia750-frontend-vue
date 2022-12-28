import { mapActions, mapMutations, mapState } from 'vuex'
import CopyLabel from '@/components/common/CopyLabel'
import QuestionnaireItem from '../../components/Questionnaire/ItemQuestionnaire'
import SetHistoryAnswersResolved from './SetHistoryAnswersResolved'
import _ from 'lodash'

export default {
  mixins: [SetHistoryAnswersResolved],
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    CopyLabel,
    QuestionnaireItem
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('student')
  },
  data () {
    return {
      pageNumber: 1,
      numberItemsPerPage: 20,
      totalNumberPages: 0,
      testData: null,
      isLastPage: false
    }
  },
  computed: {
    ...mapState('testsService', ['ItemsQuestionsByTests','questionsDataResolved'])
  },
  created() {
    this.closeAndGradeTestApi = _.debounce(this.closeAndGradeTestApi, 1000)
  },
  mounted() {
    this.fetchRecordData()
  },
  watch: {
    pageNumber(number) {
      this.fetchRecordData()
    }
  },
  methods: {
    ...mapActions('testsService', ['fetchAQuiz', 'closeAndGradeTest']),
    getTotalNumberPages(response) {
      return Math.ceil((response.data.meta.total / response.data.meta.per_page))
    },
    async fetchRecordData () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        const response = await this.fetchAQuiz({
          test_id: this.$route.params.id,
          config: {
            params: {
              'page[size]': this.numberItemsPerPage,
              'page[number]': this.pageNumber
            }
          }
        }).then((response) => {
          this.totalNumberPages = this.getTotalNumberPages(response)
          this.testData = response.data.meta.test

          if (response.data.meta.current_page === response.data.meta.last_page) {
            this.isLastPage = true
          } else {
            this.isLastPage = false
          }
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.setQuestionsHistoryResolvedOfTest()

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
      }
    },
    async closeAndGradeTestApi() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        const response = await this.closeAndGradeTest({
          test_id: this.testData.id,
          data: {},
          config: {}
        })

        this.$loadingApp.disabledLoadingProgressLinear()

        this.$router.push({
          name: 'fetch-history-test-complete',
          params: {
            id: response.data.data.id
          }
        })

      } catch (error) {
        console.log(error)
        this.$swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
          showConfirmButton: true,
          confirmButtonText: '¡Entendido!',
          timer: 10000
        })
        this.$loadingApp.disabledLoadingProgressLinear()
      }
    }
  },
  head: {
    title: {
      inner: 'Resolver Test'
    }
  }
}
