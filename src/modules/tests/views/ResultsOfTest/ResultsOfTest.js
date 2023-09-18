import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
import HeadResultsHistoryTest from '@/modules/tests/components/HistoryTest/HeadResultsHistoryTest'
import SymbologyHistoryTest from '@/modules/tests/components/HistoryTest/SymbologyHistoryTest'
import ResumeQuestionStateHistoryTest from '@/modules/tests/components/HistoryTest/ResumeQuestionStateHistoryTest'
import ItemQuestionHistoryTest from '@/modules/tests/components/HistoryTest/ItemQuestionHistoryTest'
import BlockActionsUser from './../FetchTest/BlockActionsUser'
import { PermissionEnum } from '@/utils/enums'

export default {
  mixins: [BlockActionsUser],
  components: {
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      ),
    ResourceDividerTitleDatatable: () =>
      import(
        /* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'
      ),
    HeadResultsHistoryTest,
    SymbologyHistoryTest,
    ResumeQuestionStateHistoryTest,
    ItemQuestionHistoryTest
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.GENERATE_TESTS)
  },
  data() {
    return {
      pageNumber: 1,
      numberItemsPerPage: 60,
      totalNumberPages: 0,
      testData: null,
      questionDataHistoryState: []
    }
  },
  computed: {
    ...mapState('testsService', ['questionsDataHistoryByTest'])
  },
  created() {},
  mounted() {
    this.fetchRecordData()
    this.blockActionsSelectionUser()
  },
  beforeDestroy() {
    this.removeEventsListenerActionsUser()
  },
  watch: {
    pageNumber(number) {
      this.fetchRecordData()
    }
  },
  methods: {
    ...mapActions('testsService', ['fetchHistoryTestComplete']),
    blockActionsSelectionUser() {
      const elementResolveTest = this.$refs['viewResultsOfTestComponent']

      this.blockEventJavascript(elementResolveTest, 'copy')
      this.blockEventJavascript(elementResolveTest, 'paste')
      //this.blockEventJavascript(elementResolveTest, 'keydown')
      this.blockEventJavascript(elementResolveTest, 'mousedown')
      this.blockEventJavascript(elementResolveTest, 'contextmenu')
    },
    removeEventsListenerActionsUser() {
      const elementResolveTest = this.$refs['viewResultsOfTestComponent']

      this.enableEventJavascript(elementResolveTest, 'copy')
      this.enableEventJavascript(elementResolveTest, 'paste')
      //this.enableEventJavascript(elementResolveTest, 'keydown')
      this.enableEventJavascript(elementResolveTest, 'mousedown')
      this.enableEventJavascript(elementResolveTest, 'contextmenu')
    },
    scrollToElementRefQuestion($nameElementRef) {
      const sectionQuestionHistory = document.querySelector(
        `#${$nameElementRef}`
      )

      sectionQuestionHistory.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    },
    getTotalNumberPages(response) {
      return Math.ceil(response.data.meta.total / response.data.meta.per_page)
    },
    async fetchRecordData() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        await this.fetchHistoryTestComplete({
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
      inner: 'Mis resultados del Test'
    }
  }
}
