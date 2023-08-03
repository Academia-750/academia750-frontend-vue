<template>
  <div>
    <!-- <p class="text--darken-3 mt-2 mb-3 font-weight-bold"> {{ getIndexQuestion.index }}. - <span class="font-weight-bold">{{ questionWithAnswers?.attributes['question-text'] }}</span></p> -->

    <v-list-item-content class="mb-2">
      <v-list-item-title class="text--darken-3 font-weight-bold">{{ getIndexQuestion?.index }}. - {{ questionWithAnswers?.attributes['question-text'] }}</v-list-item-title>
    </v-list-item-content>
    <!-- <p class="text--darken-3 my-3 font-weight-bold">{{ getIndexQuestion.index }}. - <span class="font-weight-bold">{{ questionWithAnswers?.attributes['question-text'] }}</span></p> -->
    <!-- <answers-radio-buttons-questionnaire
      :ref="`answers-group-question-${questionWithAnswers.id}`"
      :answers="getAnswersOfQuestion"
      :question-uuid="questionWithAnswers.id"
      @changeSelectedAnswer="changeSelectionAnswerResolvedInQuestion"
    /> -->
    <pre>
      {{ answer_selected_id }}
    </pre>
    <answers-list-solve-action-questionnaire
      :ref="`answers-group-question-${questionWithAnswers.id}`"
      :answers="getAnswersOfQuestion"
      :question-uuid="questionWithAnswers.id"
      @changeSelectedAnswer="changeSelectionAnswerResolvedInQuestion"
    />

    <div v-if="answer_selected_id" class="d-flex justify-end mx-auto my-1">
      <v-btn
        dark
        color="red darken-1"
        small
        @click="removeSelectionAnswerQuestion"
      >
        Remover selección <v-icon small class="ml-1">mdi-cancel</v-icon>
      </v-btn>
    </div>
    <v-divider class="grey lighten-3"></v-divider>
  </div>
</template>

<script>
//import AnswersRadioButtonsQuestionnaire from './AnswersRadioButtonsQuestionnaire'
import AnswersListSolveActionQuestionnaire from './AnswersListSolveActionQuestionnaire'
import { mapState, mapMutations, mapActions } from 'vuex'
import SetHistoryAnswersResolved from '../../views/FetchTest/SetHistoryAnswersResolved'
import SaveHistoryAnswersResolved from '../../views/FetchTest/SaveHistoryAnswersResolved'
import _ from 'lodash'

export default {
  name: 'ItemQuestionnaire',
  components: {
    //AnswersRadioButtonsQuestionnaire
    AnswersListSolveActionQuestionnaire
  },
  mixins: [SetHistoryAnswersResolved, SaveHistoryAnswersResolved],
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    questionWithAnswers: {
      type: Object,
      required: true
    },
    testUuid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      answer_selected_id: null
    }
  },
  computed: {
    ...mapState('testsService', ['questionsDataHistoryByTest', 'questionsDataResolved']),
    getIndexQuestion() {
      return this.questionsDataHistoryByTest.find((question) => question.question.uuid === this.questionWithAnswers.id)
    },
    getAnswersOfQuestion() {

      const answers = this.shuffleAnswers(this.questionWithAnswers.relationships['answers-test'].data)

      return answers.map((answer) => {
        return {
          answer: answer.attributes.answer_text,
          value: answer.id
        }
      })
    }
  },
  watch: {
    answer_selected_id() {
      //this.saveAnswerResolvedOfQuestion()
    },
    questionWithAnswers: {
      handler () {
        this.setAnswerResolved()
      },
      deep: true
    }
  },
  created() {
    this.saveAnswerResolvedOfQuestion = _.debounce(this.saveAnswerResolvedOfQuestion, 300)
  },
  mounted() {
    this.setAnswerResolved()
  },
  methods: {
    ...mapMutations('testsService', ['SET_QUESTIONS_DATA_RESOLVED']),
    saveQuestionAnswerInStore() {

      const questionsResolved = this.questionsDataResolved

      const questionIndex = this.getResolvedQuestion()

      if (questionIndex === -1) {
        questionsResolved.push({
          question_text: this.questionWithAnswers.attributes.question,
          answer_text: this.questionWithAnswers.relationships['answers-test'].data.find((answer) => answer.id === this.answer_selected_id),
          question_id: this.questionWithAnswers.id,
          answer_id: this.answer_selected_id
        })
        this.SET_QUESTIONS_DATA_RESOLVED(questionsResolved)

        return
      }

      questionsResolved[questionIndex]['answer_id'] = this.answer_selected_id

      //console.log(questionsResolved)
      this.SET_QUESTIONS_DATA_RESOLVED(questionsResolved)
    },
    getResolvedQuestion() {
      return this.questionsDataResolved.findIndex((question) => question.question_id === this.questionUuid)
    }
  }
}
</script>

<style scoped>
  .v-list-item__subtitle, .v-list-item__title{
      text-overflow: initial!important;
      white-space: initial!important;
      color: #000;
  }
</style>
