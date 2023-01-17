export default {
  methods: {
    bindingCheckGroupAnswer({ value, uuid }) {
      if (!value) {
        this.answerGrouperSelected = ''

        return
      }

      this.answerGrouperSelected = uuid
    },
    getFormDataForSaveQuestion () {
      const FormDataQuestion = new FormData()

      FormDataQuestion.append('question-text', this.$refs['FormQuestionTextField'].question_text)
      FormDataQuestion.append('is-test', this.$refs['FormQuestionTypeTestCheckbox'].is_test)
      FormDataQuestion.append('is-card-memory', this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory)
      FormDataQuestion.append('is-visible', this.$refs['FormQuestionIsVisibleCheckbox'].is_visible)
      FormDataQuestion.append('reason-question', this.$refs['FormReasonTextArea'].reason_value)
      FormDataQuestion.append('file-reason', this.$refs['FormAddQuestionImage'].image)

      if (!this.isTestQuestion) {
        FormDataQuestion.append('answer-correct', this.$refs['FormAnswerCorrectField'].answer_value)
        FormDataQuestion.append('is-question-binary-alternatives', 'not_defined')

        return FormDataQuestion
      }

      if (this.isQuestionBinary) {
        FormDataQuestion.append('answer-correct', this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value)
        FormDataQuestion.append('another-answer-binary-alternative', this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value)
        FormDataQuestion.append('is-question-binary-alternatives', 'yes')

        return FormDataQuestion
      }

      FormDataQuestion.append('is-question-binary-alternatives', 'no')
      FormDataQuestion.append('answer-correct', this.$refs['FormAnswerCorrectField'].answer_value)
      FormDataQuestion.append('is-grouper-answer-correct', this.$refs['FormAnswerCorrectField'].is_grouper_answer)

      FormDataQuestion.append('answer-one', this.$refs['FormAnswerOneField'].answer_value)
      FormDataQuestion.append('is-grouper-answer-one', this.$refs['FormAnswerOneField'].is_grouper_answer)

      FormDataQuestion.append('answer-two', this.$refs['FormAnswerTwoField'].answer_value)
      FormDataQuestion.append('is-grouper-answer-two', this.$refs['FormAnswerTwoField'].is_grouper_answer)

      FormDataQuestion.append('answer-three', this.$refs['FormAnswerThreeField'].answer_value)
      FormDataQuestion.append('is-grouper-answer-three', this.$refs['FormAnswerThreeField'].is_grouper_answer)

      return FormDataQuestion
    },
    generateUUID() {
      let d = new Date().getTime()

      let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16

        if (d > 0) {

          r = (d + r) % 16 | 0
          d = Math.floor(d / 16)
        } else {
          r = (d2 + r) % 16 | 0
          d2 = Math.floor(d2 / 16)
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateQuestion']['setErrors'](errorResponse)
    },
    async ResetForm() {

      this.loadingButtonCreateQuestion = false
      this.disabledButtonCreateQuestion = false

      this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value = ''

      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value = ''

      this.$refs['FormQuestionTextField'].question_text = ''
      this.$refs['FormQuestionTypeTestCheckbox'].is_test = false
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = false
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = true
      this.$refs['FormAnswerCorrectField'].answer_value = ''
      this.$refs['FormAnswerCorrectField'].is_grouper_answer = ''
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = ''
      this.$refs['FormAnswerOneField'].answer_value = ''
      this.$refs['FormAnswerOneField'].is_grouper_answer = ''
      this.$refs['FormAnswerTwoField'].answer_value = ''
      this.$refs['FormAnswerTwoField'].is_grouper_answer = ''
      this.$refs['FormAnswerThreeField'].answer_value = ''
      this.$refs['FormAnswerThreeField'].is_grouper_answer = ''
      this.$refs['FormReasonTextArea'].reason_value = ''
      this.$refs['FormAddQuestionImage'].image = null

      this.dataAnswersUuid = [
        this.generateUUID(),
        this.generateUUID(),
        this.generateUUID(),
        this.generateUUID()
      ]

      this.isCardMemoryQuestion = false
      this.isTestQuestion = false
      this.answerGrouperSelected = ''

      this.isQuestionBinary = false
      this.imageReason = null

      this.$nextTick(() => {
        this.$refs['FormCreateQuestion']['reset']()
      })

      return true
    },
    async CreateQuestion() {

      const statusValidate = await this.$refs['FormCreateQuestion'].validate()

      if (!statusValidate) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })

        return
      }

      const isTest = this.$refs['FormQuestionTypeTestCheckbox'].is_test
      const isCardMemory = this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory
      const valueReasonText = this.$refs['FormReasonTextArea'].reason_value
      const valueReasonImage = this.$refs['FormAddQuestionImage'].image

      if (isCardMemory && !(valueReasonText || valueReasonImage)) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Las preguntas para Tarjetas de memoria, deben contener al menos una explicación en Texto o Imagen',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      if (!isTest && !isCardMemory) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'La pregunta debe ser para un Test o tarjeta de memoria',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonCreateQuestion = true
      this.disabledButtonCreateQuestion = true
      this.CreateQuestionApi()
    }

  }
}
