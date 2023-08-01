import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('testsService', ['questionsDataHistoryByTest'])
  },
  methods: {
    ...mapMutations('testsService', ['SET_QUESTIONS_DATA_RESOLVED']),
    setQuestionsHistoryResolvedOfTest() {
      const questionsDataResolvedHistory = this.ItemsQuestionsByTests.map((question) => {
        return {
          question_id: question.id,
          answer_id: this.questionsDataHistoryByTest.find((questionHistory) => questionHistory.question_id === question.id)?.answer_id
        }
      })

      this.SET_QUESTIONS_DATA_RESOLVED(questionsDataResolvedHistory)
    },
    shuffleAnswers(answers) {
      const answersNoGrouper = answers.filter((answer) => answer.attributes.is_grouper === 'no')
      const answersGrouper = answers.filter((answer) => answer.attributes.is_grouper === 'yes')

      answersNoGrouper.sort(() => Math.random() - 0.5)

      answersGrouper.forEach((answerGrouper) => {
        answersNoGrouper.push(answerGrouper)
      })

      return answersNoGrouper
    },
    setAnswerResolved() {
      const Question = this.questionsDataHistoryByTest.find((question) => question.question.uuid === this.questionWithAnswers.id)

      this.$refs[`answers-group-question-${this.questionWithAnswers.id}`].answer_selected_id = Question.answer_id
      this.answer_selected_id = Question.answer_id

      //this.saveQuestionAnswerInStore()
    }
  }
}
