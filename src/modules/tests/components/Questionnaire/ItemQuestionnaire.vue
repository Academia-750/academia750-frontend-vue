<template>
  <div>
    <p class="text--darken-3 mt-2 mb-3 font-weight-bold"> {{ index + 1 }}. - <span class="font-weight-black">{{ questionWithAnswers?.attributes['question-text'] }}</span></p>
    <answers-radio-buttons-questionnaire
      :ref="`answers-group-question-${questionWithAnswers.id}`"
      :answers="getAnswersOfQuestion"
      @AnswerSelectedBinding="answer_selected_id = $event"
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
import { mapState } from 'vuex'

export default {
  name: 'ItemQuestionnaire',
  components: {
    AnswersRadioButtonsQuestionnaire
  },
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    questionWithAnswers: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      answer_selected_id: null
    }
  },
  computed: {
    ...mapState('testsService', ['questionsDataByTest']),
    getIndexQuestion() {
      return this.questionsDataByTest.find((question) => question.question_id === this.questionWithAnswers.id)
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
    questionWithAnswers (value) {
      console.log(value)
    }
  },
  mounted () {
  },
  methods: {
    shuffleAnswers(answers) {
      const answersNoGrouper = answers.filter((answer) => answer.attributes.is_grouper === 'no')
      const answersGrouper = answers.filter((answer) => answer.attributes.is_grouper === 'yes')

      answersNoGrouper.sort(() => Math.random() - 0.5)

      answersGrouper.forEach((answerGrouper) => {
        answersNoGrouper.push(answerGrouper)
      })

      return answersNoGrouper
    },
    removeSelectionAnswerQuestion() {
      this.$refs[`answers-group-question-${this.questionWithAnswers.id}`].answer_selected_id = null
      this.answer_selected_id = null
    }
  }
}
</script>
