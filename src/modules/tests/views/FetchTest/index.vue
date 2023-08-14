<template>
  <v-card-text ref="resolveTestView">
    <resource-header-crud-title
      text-header="Resolver test"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Resolver test"
      />
    </v-toolbar>
    <v-card-text>
      <div v-if="ItemsQuestionsByTests && ItemsQuestionsByTests.length > 0">
        <v-container class="max-width d-flex justify-center">
          <v-pagination
            v-model="pageNumber"
            class="my-4"
            :length="totalNumberPages"
          ></v-pagination>
        </v-container>
        <v-container
          :class="{
            'ma-0': $vuetify.breakpoint.mdAndDown,
            'pa-0': $vuetify.breakpoint.mdAndDown
          }"
        >
          <v-row dense class="ma-0 pa-0">
            <v-col
              v-for="(question, index) in ItemsQuestionsByTests"
              :key="`Sección Test Pregunta - ${question.id}`"
              cols="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
            >
              <questionnaire-item
                v-if="testData"
                :test-uuid="testData.id"
                :index="index"
                :question-with-answers="question"
                @emitSaveAnswerAndUpdateProgressTest="
                  setDataStatisticProgress(
                    $event.number_of_questions_answered_of_test,
                    $event.total_questions_of_this_test
                  )
                "
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container v-if="isLastPage" class="max-width d-flex justify-end">
          <v-btn
            color="blue lighten-4"
            :disabled="isDisabledCloseTest"
            :loading="isLoadingCloseTest"
            elevation="6"
            rounded
            @click="closeAndGradeTestAction"
          >
            Finalizar Test <v-icon class="ml-1">mdi-pencil</v-icon>
          </v-btn>
        </v-container>
        <v-container class="max-width d-flex justify-center">
          <v-pagination
            v-model="pageNumber"
            class="my-4"
            :length="totalNumberPages"
          ></v-pagination>
        </v-container>
      </div>
      <!-- <progress-linear-state-test
        :number-questions-resolved="numberQuestionsResolved"
        :total-number-questions-test="totalNumberQuestionsTest"
      /> -->
      <v-container
        v-if="
          (!ItemsQuestionsByTests || ItemsQuestionsByTests.length === 0) &&
          !isLoading
        "
        class="d-flex justify-center"
      >
        <p class="font-weight-black display-1">
          No ha sido posible generar una prueba con preguntas disponibles. Por
          favor, reporte este problema al correo oficial de la academia y
          intente crear otra prueba más tarde.
        </p>
      </v-container>
    </v-card-text>
  </v-card-text>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import CopyLabel from '@/components/common/CopyLabel'
import QuestionnaireItem from '../../components/Questionnaire/ItemQuestionnaire'
import SetHistoryAnswersResolved from './SetHistoryAnswersResolved'
import _ from 'lodash'
import BlockActionsUser from './BlockActionsUser'
import ProgressLinearStateTest from './components/progressLinearStateTest'

export default {
  components: {
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      ),

    QuestionnaireItem
  },
  mixins: [SetHistoryAnswersResolved, BlockActionsUser],
  data() {
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
    ...mapState('testsService', [
      'ItemsQuestionsByTests',
      'questionsDataResolved'
    ])
  },
  watch: {
    pageNumber(number) {
      this.fetchRecordData()
    },
    totalNumberQuestionsTest(number) {
      this.SET_TOTAL_NUMBER_QUESTIONS_TEST(number)
    },
    numberQuestionsResolved(number) {
      this.SET_NUMBER_QUESTIONS_RESOLVED(number)
    }
  },
  created() {
    this.closeAndGradeTestApi = _.debounce(this.closeAndGradeTestApi, 1000)
  },
  mounted() {
    this.fetchRecordData()
    this.blockActionsSelectionUser()
    this.SET_TOTAL_NUMBER_QUESTIONS_TEST(0)
    this.SET_NUMBER_QUESTIONS_RESOLVED(0)

    //console.log(this.$router.currentRoute.name)
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('student')
  },
  beforeDestroy() {
    this.removeEventsListenerActionsUser()
  },
  methods: {
    ...mapMutations('testsService', [
      'SET_NUMBER_QUESTIONS_RESOLVED',
      'SET_TOTAL_NUMBER_QUESTIONS_TEST'
    ]),
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
      return Math.ceil(response.data.meta.total / response.data.meta.per_page)
    },
    setDataStatisticProgress(
      numberQuestionsResolved,
      totalNumberQuestionsTest
    ) {
      /* //console.log(numberQuestionsResolved)
      //console.log(totalNumberQuestionsTest) */
      this.numberQuestionsResolved = parseInt(numberQuestionsResolved)
      this.totalNumberQuestionsTest = parseInt(totalNumberQuestionsTest)
    },
    async fetchRecordData() {
      try {
        this.isLoading = true
        this.$loadingApp.enableLoadingProgressLinear()

        await this.fetchAQuiz({
          test_id: this.$route.params.id,
          config: {
            params: {
              'page[size]': this.numberItemsPerPage,
              'page[number]': this.pageNumber
            }
          }
        }).then((response) => {
          const {
            test,
            number_of_questions_answered_of_test,
            total_questions_of_this_test
          } = response.data.meta

          this.totalNumberPages = this.getTotalNumberPages(response)
          this.testData = test

          this.setDataStatisticProgress(
            number_of_questions_answered_of_test,
            total_questions_of_this_test
          )
          if (
            response.data.meta.current_page === response.data.meta.last_page
          ) {
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
        //console.log(error)
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
        //console.log(error)
        this.isDisabledCloseTest = false
        this.isLoadingCloseTest = false
        this.$swal.fire({
          icon: 'error',
          title:
            'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
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
</script>
