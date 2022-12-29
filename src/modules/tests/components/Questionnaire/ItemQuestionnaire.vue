<template>
  <div>
    <p class="text--darken-3 mt-2 mb-3 font-weight-bold"> {{ getIndexQuestion.index }}. - <span class="font-weight-black">{{ questionWithAnswers?.attributes['question-text'] }}</span></p>
    <answers-radio-buttons-questionnaire
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
import AnswersRadioButtonsQuestionnaire from './AnswersRadioButtonsQuestionnaire'
import { mapState, mapMutations, mapActions } from 'vuex'
import SetHistoryAnswersResolved from '../../views/FetchTest/SetHistoryAnswersResolved'
import SaveHistoryAnswersResolved from '../../views/FetchTest/SaveHistoryAnswersResolved'
import _ from 'lodash'

export default {
  name: 'ItemQuestionnaire',
  components: {
    AnswersRadioButtonsQuestionnaire
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
      return this.questionsDataHistoryByTest.find((question) => question.question_id === this.questionWithAnswers.id)
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

      console.log(questionsResolved)
      this.SET_QUESTIONS_DATA_RESOLVED(questionsResolved)
    },
    getResolvedQuestion() {
      return this.questionsDataResolved.findIndex((question) => question.question_id === this.questionUuid)
    }
  }
}
</script>
