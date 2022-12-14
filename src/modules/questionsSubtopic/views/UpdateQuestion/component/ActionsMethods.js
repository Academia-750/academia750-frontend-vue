import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsSubtopicService', ['fetchQuestion','updateQuestion']),
    async UpdateQuestionApi() {
      try {
        const FormDataQuestion = new FormData()

        FormDataQuestion.append('question-text', this.$refs['FormQuestionTextField'].question_text)
        FormDataQuestion.append('is-test', this.$refs['FormQuestionTypeTestCheckbox'].is_test)
        FormDataQuestion.append('is-card-memory', this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory)
        FormDataQuestion.append('is-visible', this.$refs['FormQuestionIsVisibleCheckbox'].is_visible)

        FormDataQuestion.append('answer-correct-id', this.$refs['FormAnswerCorrectField'].answer_id)
        FormDataQuestion.append('answer-correct', this.$refs['FormAnswerCorrectField'].answer_value)
        FormDataQuestion.append('is-grouper-answer-correct', this.$refs['FormAnswerCorrectField'].is_grouper_answer)

        FormDataQuestion.append('answer-one-id', this.$refs['FormAnswerOneField'].answer_id)
        FormDataQuestion.append('answer-one', this.$refs['FormAnswerOneField'].answer_value)
        FormDataQuestion.append('is-grouper-answer-one', this.$refs['FormAnswerOneField'].is_grouper_answer)

        FormDataQuestion.append('answer-two-id', this.$refs['FormAnswerTwoField'].answer_id)
        FormDataQuestion.append('answer-two', this.$refs['FormAnswerTwoField'].answer_value)
        FormDataQuestion.append('is-grouper-answer-two', this.$refs['FormAnswerTwoField'].is_grouper_answer)

        FormDataQuestion.append('answer-three-id', this.$refs['FormAnswerThreeField'].answer_id)
        FormDataQuestion.append('answer-three', this.$refs['FormAnswerThreeField'].answer_value)
        FormDataQuestion.append('is-grouper-answer-three', this.$refs['FormAnswerThreeField'].is_grouper_answer)

        FormDataQuestion.append('reason-question', this.$refs['FormReasonTextArea'].reason_value)
        FormDataQuestion.append('file-reason', this.$refs['FormAddQuestionImage'].image)

        await this.updateQuestion({
          subtopic_id: this.$route.params.subtopic_id,
          question_id: this.$route.params.question_id,
          data: FormDataQuestion,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La pregunta ha sido actualizada con éxito.',
          timer: 10000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateQuestion = false
        this.disabledButtonUpdateQuestion = false

        this.$router.push({
          name: 'manage-questions-of-subtopic'
        })
        //this.ResetForm()
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateQuestion = false
        this.disabledButtonUpdateQuestion = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async fetchDataQuestionForUpdate() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonUpdateQuestion = true

        const response = await this.fetchQuestion({
          subtopic_id: this.$route.params.subtopic_id,
          question_id: this.$route.params.question_id,
          config: {
            params: {
              include: 'image,answers'
            }
          }
        })

        this.syncValuesForm(response)

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateQuestion = false

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateQuestion = false
      }
    }
  }
}
