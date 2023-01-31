import { mapActions, mapMutations, mapState } from 'vuex'
import CopyLabel from '@/components/common/CopyLabel'
import QuestionnaireItem from '../../components/Questionnaire/ItemQuestionnaire'
import SetHistoryAnswersResolved from './SetHistoryAnswersResolved'
import _ from 'lodash'
import BlockActionsUser from './BlockActionsUser'
import ProgressLinearStateTest from './components/progressLinearStateTest'

export default {
  mixins: [SetHistoryAnswersResolved, BlockActionsUser],
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    CopyLabel,
    QuestionnaireItem,
    ProgressLinearStateTest
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
      isLastPage: false,
      isLoading: false,
      isDisabledCloseTest: false,
      isLoadingCloseTest: false,
      numberQuestionsResolved: 0,
      totalNumberQuestionsTest: 0
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
    this.blockActionsSelectionUser()
    this.SET_TOTAL_NUMBER_QUESTIONS_TEST(0)
    this.SET_NUMBER_QUESTIONS_RESOLVED(0)

    console.log(this.$router.currentRoute.name)
  },
  beforeDestroy() {
    this.removeEventsListenerActionsUser()
  },
  watch: {
    pageNumber(number) {
      this.fetchRecordData()
    },
    totalNumberQuestionsTest (number) {
      this.SET_TOTAL_NUMBER_QUESTIONS_TEST(number)
    },
    numberQuestionsResolved (number) {
      this.SET_NUMBER_QUESTIONS_RESOLVED(number)
    }
  },
  methods: {
    ...mapMutations('testsService', ['SET_NUMBER_QUESTIONS_RESOLVED','SET_TOTAL_NUMBER_QUESTIONS_TEST']),
    ...mapActions('testsService', ['fetchAQuiz', 'closeAndGradeTest']),
    blockActionsSelectionUser() {
      const elementResolveTest = this.$refs['resolveTestView']

      this.blockEventJavascript(elementResolveTest, 'copy')
      this.blockEventJavascript(elementResolveTest, 'paste')
      this.blockEventJavascript(elementResolveTest, 'keydown')
      this.blockEventJavascript(elementResolveTest, 'mousedown')
      this.blockEventJavascript(elementResolveTest, 'contextmenu')
    },
    removeEventsListenerActionsUser() {
      const elementResolveTest = this.$refs['resolveTestView']

      this.enableEventJavascript(elementResolveTest, 'copy')
      this.enableEventJavascript(elementResolveTest, 'paste')
      this.enableEventJavascript(elementResolveTest, 'keydown')
      this.enableEventJavascript(elementResolveTest, 'mousedown')
      this.enableEventJavascript(elementResolveTest, 'contextmenu')
    },
    getTotalNumberPages(response) {
      return Math.ceil((response.data.meta.total / response.data.meta.per_page))
    },
    setDataStatisticProgress(numberQuestionsResolved, totalNumberQuestionsTest) {
      /* console.log(numberQuestionsResolved)
      console.log(totalNumberQuestionsTest) */
      this.numberQuestionsResolved = parseInt(numberQuestionsResolved)
      this.totalNumberQuestionsTest = parseInt(totalNumberQuestionsTest)
    },
    async fetchRecordData () {
      try {
        this.isLoading = true
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

          const { test, number_of_questions_answered_of_test, total_questions_of_this_test } = response.data.meta

          this.totalNumberPages = this.getTotalNumberPages(response)
          this.testData = test

          this.setDataStatisticProgress(number_of_questions_answered_of_test, total_questions_of_this_test)
          /* this.numberQuestionsResolved = parseInt(number_of_questions_answered_of_test)
          this.totalNumberQuestionsTest = parseInt(total_questions_of_this_test) */
          //this.$refs['progressLinearStateQuestionsTest'].calculateValueProgressQuestionsTest()

          if (response.data.meta.current_page === response.data.meta.last_page) {
            this.isLastPage = true
          } else {
            this.isLastPage = false
          }
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.setQuestionsHistoryResolvedOfTest()
        this.isLoading = false

      } catch (error) {
        this.isLoading = false
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
      }
    },
    closeAndGradeTestAction() {
      this.$loadingApp.enableLoadingProgressLinear()
      this.isDisabledCloseTest = true
      this.isLoadingCloseTest = true
      this.closeAndGradeTestApi()
    },
    verifyProgressTestAndConfirmGrade() {
      /* if (this.numberQuestionsResolved >= this.totalNumberQuestionsTest) {
        this.closeAndGradeTestApi()

        return
      } */

      this.closeAndGradeTestApi()
    },
    async closeAndGradeTestApi() {
      try {
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

        this.isDisabledCloseTest = false
        this.isLoadingCloseTest = false

      } catch (error) {
        console.log(error)
        this.isDisabledCloseTest = false
        this.isLoadingCloseTest = false
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
