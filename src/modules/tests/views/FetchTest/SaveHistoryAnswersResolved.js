import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('testsService', ['resolveQuestion']),
    async saveAnswerResolvedOfQuestion() {
      try {
        const response = await this.resolveQuestion({
          data: {
            question_id: this.questionWithAnswers.id,
            test_id: this.testUuid,
            answer_id: this.answer_selected_id
          },
          config: {}
        })

        const { number_of_questions_answered_of_test, total_questions_of_this_test } = response.data

        /* this.numberQuestionsResolved = parseInt(response.data.number_of_questions_answered_of_test)
        this.totalNumberQuestionsTest = parseInt(response.data.total_questions_of_this_test) */

        this.$emit('emitSaveAnswerAndUpdateProgressTest', {
          number_of_questions_answered_of_test, total_questions_of_this_test
        })
        //this.$refs['progressLinearStateQuestionsTest'].calculateValueProgressQuestionsTest()

      } catch (error) {
        console.log(error)
      }
    },
    changeSelectionAnswerResolvedInQuestion() {
      this.answer_selected_id = this.$refs[`answers-group-question-${this.questionWithAnswers.id}`].answer_selected_id
      this.saveAnswerResolvedOfQuestion()
    },
    removeSelectionAnswerQuestion() {
      this.$refs[`answers-group-question-${this.questionWithAnswers.id}`].answer_selected_id = null
      this.answer_selected_id = null
      this.saveAnswerResolvedOfQuestion()

    }
  }
}
