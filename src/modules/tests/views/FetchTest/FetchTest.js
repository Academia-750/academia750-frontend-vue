import { mapActions, mapMutations, mapState } from 'vuex'
import CopyLabel from '@/components/common/CopyLabel'
import QuestionnaireItem from '../../components/Questionnaire/ItemQuestionnaire'
import SetHistoryAnswersResolved from './SetHistoryAnswersResolved'

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
      testData: null
    }
  },
  computed: {
    ...mapState('testsService', ['ItemsQuestionsByTests','questionsDataResolved'])
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
    ...mapActions('testsService', ['fetchAQuiz']),
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
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.setQuestionsHistoryResolvedOfTest()

      } catch (error) {
        console.log(error)
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
