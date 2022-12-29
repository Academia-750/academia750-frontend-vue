import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('testsService', ['resolveQuestion']),
    async saveAnswerResolvedOfQuestion() {
      try {
        await this.resolveQuestion({
          data: {
            question_id: this.questionWithAnswers.id,
            test_id: this.testUuid,
            answer_id: this.answer_selected_id
          },
          config: {}
        })

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
