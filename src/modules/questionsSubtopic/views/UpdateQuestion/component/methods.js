export default {
  methods: {
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdateQuestion']['setErrors'](errorResponse)
    },
    async ResetForm() {

      this.loadingButtonUpdateQuestion = false
      this.disabledButtonUpdateQuestion = false

      this.$refs['FormQuestionTextField'].question_text = ''
      this.$refs['FormQuestionTypeTestCheckbox'].is_test = ''
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = ''
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = ''
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

      this.$nextTick(() => {
        this.$refs['FormUpdateQuestion']['reset']()
      })

      return true
    },
    async UpdateQuestion() {

      const statusValidate = await this.$refs['FormUpdateQuestion'].validate()

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

      const isCardMemory = this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory
      const valueReasonText = this.$refs['FormReasonTextArea'].reason_value
      const valueReasonImage = this.$refs['FormAddQuestionImage'].image
      const hasImageQuestion = this.questionData.data.relationships.image !== null

      if (isCardMemory && !hasImageQuestion && !(valueReasonText || valueReasonImage)) {
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

      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonUpdateQuestion = true
      this.disabledButtonUpdateQuestion = true
      this.UpdateQuestionApi()
    },
    syncValuesForm(response) {
      const { attributes, relationships } = response.data.data
      const { subtopic } = response.data.meta
      let { data: dataAnswers } = relationships.answers

      this.questionData = response.data
      this.subtopicData = subtopic

      this.$refs['FormQuestionTextField'].question_text = attributes['question-text']
      this.$refs['FormQuestionTypeTestCheckbox'].is_test = attributes.its_for_test === 'yes'
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = attributes.its_for_card_memory === 'yes'
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = attributes.is_visible

      const answerCorrect = dataAnswers.filter((answer) => answer.attributes.is_correct_answer === 'yes')

      console.log(answerCorrect)
      console.log(dataAnswers)

      dataAnswers = dataAnswers.filter((answer) => answer.attributes.is_correct_answer === 'no')
      console.log(dataAnswers)

      this.$refs['FormAnswerCorrectField'].answer_id = answerCorrect[0].id
      this.$refs['FormAnswerCorrectField'].answer_value = answerCorrect[0].attributes.answer_text
      this.$refs['FormAnswerCorrectField'].is_grouper_answer = answerCorrect[0].attributes.is_grouper_answer === 'yes'

      this.$refs['FormAnswerOneField'].answer_id = dataAnswers[0].id
      this.$refs['FormAnswerOneField'].answer_value = dataAnswers[0].attributes.answer_text
      this.$refs['FormAnswerOneField'].is_grouper_answer = dataAnswers[0].attributes.is_grouper_answer === 'yes'

      this.$refs['FormAnswerTwoField'].answer_id = dataAnswers[1].id
      this.$refs['FormAnswerTwoField'].answer_value = dataAnswers[1].attributes.answer_text
      this.$refs['FormAnswerTwoField'].is_grouper_answer = dataAnswers[1].attributes.is_grouper_answer === 'yes'

      this.$refs['FormAnswerThreeField'].answer_id = dataAnswers[2].id
      this.$refs['FormAnswerThreeField'].answer_value = dataAnswers[2].attributes.answer_text
      this.$refs['FormAnswerThreeField'].is_grouper_answer = dataAnswers[2].attributes.is_grouper_answer === 'yes'

      this.$refs['FormReasonTextArea'].reason_value = attributes['reason-text'] ? attributes['reason-text'] : ''

      if (relationships.image) {
        const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
        const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
        const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION

        if (relationships.image.attributes.type_path === 'url') {
          this.$refs['FormAddQuestionImage'].urlImage = relationships.image.attributes.path
          this.$refs['FormAddQuestionImage'].previewImageForUpdate = true
        }

        if (relationships.image.attributes.type_path === 'local') {
          this.$refs['FormAddQuestionImage'].urlImage = `${IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction}${relationships.image.attributes.path}`
          this.$refs['FormAddQuestionImage'].previewImageForUpdate = true
        }

      }

    }
  }
}
