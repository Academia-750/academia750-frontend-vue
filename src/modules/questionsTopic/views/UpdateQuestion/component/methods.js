export default {
  methods: {
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdateQuestion']['setErrors'](errorResponse)
    },
    bindingCheckGroupAnswer({ value, uuid }) {
      if (!value) {
        this.answerGrouperSelected = ''

        return
      }

      this.answerGrouperSelected = uuid
    },
    async ResetForm() {

      this.loadingButtonCreateQuestion = false
      this.disabledButtonCreateQuestion = false

      this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value = ''

      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value = ''

      this.$refs['FormQuestionTextField'].question_text = ''
      this.$refs['FormQuestionTypeTestCheckbox'].is_test = true
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = false
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = true
      this.$refs['FormAnswerCorrectField'].answer_value = ''
      this.$refs['FormAnswerCorrectField'].is_grouper_answer = ''
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
      this.isTestQuestion = true
      this.answerGrouperSelected = ''

      this.isQuestionBinary = false
      this.imageReason = null

      this.$nextTick(() => {
        this.$refs['FormCreateQuestion']['reset']()
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
    getFormDataForSaveQuestion () {
      const FormDataQuestion = new FormData()

      FormDataQuestion.append('remove-image-existing', 'no')
      FormDataQuestion.append('question-text', this.$refs['FormQuestionTextField'].question_text)
      FormDataQuestion.append('is-test', this.$refs['FormQuestionTypeTestCheckbox'].is_test)
      FormDataQuestion.append('is-card-memory', this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory)
      FormDataQuestion.append('is-visible', this.$refs['FormQuestionIsVisibleCheckbox'].is_visible)
      FormDataQuestion.append('reason-question', this.$refs['FormReasonTextArea'].reason_value)
      FormDataQuestion.append('file-reason', this.$refs['FormAddQuestionImage'].image)

      if (this.reasonText) {
        FormDataQuestion.append('show_reason_text_in_test', this.show_reason_text_in_test ? 'yes' : 'no')
        FormDataQuestion.append('show_reason_text_in_card_memory', this.show_reason_text_in_card_memory ? 'yes' : 'no')
      } else {
        FormDataQuestion.append('show_reason_text_in_test', 'no')
        FormDataQuestion.append('show_reason_text_in_card_memory', 'no')
      }

      if (this.imageReason || this.isThereImageQuestionUpdate) {
        FormDataQuestion.append('show_reason_image_in_test', this.show_reason_image_in_test ? 'yes' : 'no')
        FormDataQuestion.append('show_reason_image_in_card_memory', this.show_reason_image_in_card_memory ? 'yes' : 'no')
      } else {
        FormDataQuestion.append('show_reason_image_in_test', 'no')
        FormDataQuestion.append('show_reason_image_in_card_memory', 'no')
      }

      if (!this.isTestQuestion) {
        FormDataQuestion.append('answer-correct', this.$refs['FormAnswerCorrectField'].answer_value)
        FormDataQuestion.append('is-question-binary-alternatives', 'no')

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
    loadImageQuestion (relationships) {
      if (relationships.image) {
        const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
        const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
        const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION

        if (relationships.image.attributes.type_path === 'url') {
          this.$refs['FormAddQuestionImage'].urlImage = relationships.image.attributes.path
          this.$refs['FormAddQuestionImage'].previewImageForUpdate = true
          this.isThereImageQuestionUpdate = true
        }

        if (relationships.image.attributes.type_path === 'local') {
          this.$refs['FormAddQuestionImage'].urlImage = `${IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction}${relationships.image.attributes.path}`
          this.$refs['FormAddQuestionImage'].previewImageForUpdate = true
          this.isThereImageQuestionUpdate = true
        }

      }
    },
    loadAnswersQuestion (dataAnswers, { isTest, isCardMemory, isQuestionBinary }) {

      const dataAnswersAlternativesNoCorrect = dataAnswers.filter((answer) => answer.attributes.is_correct_answer === 'no')
      const answerCorrect = dataAnswers.find((answer) => answer.attributes.is_correct_answer === 'yes')

      /* console.log(dataAnswersAlternativesNoCorrect)
      console.log(answerCorrect) */

      this.$refs['FormAnswerCorrectField'].answer_id = answerCorrect.id
      this.$refs['FormAnswerCorrectField'].answer_value = answerCorrect.attributes.answer_text
      this.$refs['FormAnswerCorrectField'].is_grouper_answer = answerCorrect.attributes.is_grouper_answer === 'yes'

      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_id = answerCorrect.id
      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value = answerCorrect.attributes.answer_text
      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].is_grouper_answer = answerCorrect.attributes.is_grouper_answer === 'yes'

      if (!isTest && isCardMemory && !isQuestionBinary && answerCorrect) {
        console.info('Pregunta de tipo tarjeta de memoria')

        return
      }

      if (isTest && !isQuestionBinary) {
        console.info('Pregunta de tipo Test y pregunta de alternativas no binaria')

        if (dataAnswersAlternativesNoCorrect && dataAnswersAlternativesNoCorrect.length > 0) {

          this.$refs['FormAnswerOneField'].answer_id = dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerOneField'].answer_value = dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerOneField'].is_grouper_answer = dataAnswersAlternativesNoCorrect[0].attributes.is_grouper_answer === 'yes'

          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_id = dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value = dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].is_grouper_answer = false

          this.$refs['FormAnswerTwoField'].answer_id = dataAnswersAlternativesNoCorrect[1].id
          this.$refs['FormAnswerTwoField'].answer_value = dataAnswersAlternativesNoCorrect[1].attributes.answer_text
          this.$refs['FormAnswerTwoField'].is_grouper_answer = dataAnswersAlternativesNoCorrect[1].attributes.is_grouper_answer === 'yes'

          this.$refs['FormAnswerThreeField'].answer_id = dataAnswersAlternativesNoCorrect[2].id
          this.$refs['FormAnswerThreeField'].answer_value = dataAnswersAlternativesNoCorrect[2].attributes.answer_text
          this.$refs['FormAnswerThreeField'].is_grouper_answer = dataAnswersAlternativesNoCorrect[2].attributes.is_grouper_answer === 'yes'
        }

        return
      }

      if (isTest && isQuestionBinary) {
        console.info('Pregunta de tipo Test y pregunta de alternativas binaria')

        if (dataAnswersAlternativesNoCorrect && dataAnswersAlternativesNoCorrect.length > 0) {
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_id = dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value = dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].is_grouper_answer = false

          this.$refs['FormAnswerOneField'].answer_id = dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerOneField'].answer_value = dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerOneField'].is_grouper_answer = false
        }

        return
      }

      console.log(dataAnswers)
      console.log({
        isTest,
        isCardMemory,
        isQuestionBinary
      })
    },
    syncValuesForm(response) {
      console.log(response.data)

      this.loadingButtonCreateQuestion = false
      this.disabledButtonCreateQuestion = false

      const { attributes, relationships } = response.data.data
      const { topic } = response.data.meta

      this.$refs['FormQuestionTextField'].question_text = attributes['question-text']
      /* Consultar todo sobre el tipo de pregunta es */

      const ITS_CARD_MEMORY_BOOLEAN = attributes.its_for_card_memory === 'yes'
      const ITS_TEST_BOOLEAN = attributes.its_for_test === 'yes'
      const ITS_BINARY_QUESTION_BOOLEAN = attributes.is_question_binary_alternatives === 'yes'
      const ITS_VISABLE_QUESTION_BOOLEAN = attributes.is_visible === 'yes'

      const SHOW_REASON_TEXT_IN_TEST = attributes.show_reason_text_in_test === 'yes'
      const SHOW_REASON_TEXT_IN_CARD_MEMORY = attributes.show_reason_text_in_card_memory === 'yes'
      const SHOW_REASON_IMAGE_IN_TEST = attributes.show_reason_image_in_test === 'yes'
      const SHOW_REASON_IMAGE_IN_CARD_MEMORY = attributes.show_reason_image_in_card_memory === 'yes'

      this.questionData = response.data
      this.topicData = topic

      this.isCardMemoryQuestion = ITS_CARD_MEMORY_BOOLEAN
      this.isTestQuestion = ITS_TEST_BOOLEAN
      this.isQuestionBinary = ITS_BINARY_QUESTION_BOOLEAN

      this.show_reason_text_in_test = SHOW_REASON_TEXT_IN_TEST
      this.show_reason_text_in_card_memory = SHOW_REASON_TEXT_IN_CARD_MEMORY
      this.show_reason_image_in_test = SHOW_REASON_IMAGE_IN_TEST
      this.show_reason_image_in_card_memory = SHOW_REASON_IMAGE_IN_CARD_MEMORY

      this.$refs['FormQuestionTypeTestCheckbox'].is_test = ITS_TEST_BOOLEAN
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = ITS_CARD_MEMORY_BOOLEAN
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = ITS_VISABLE_QUESTION_BOOLEAN

      this.answerGrouperSelected = ''

      this.$refs['FormReasonTextArea'].reason_value = attributes['reason-text']
      this.reasonText = attributes['reason-text']

      this.loadAnswersQuestion(relationships.answers.data, {
        isTest: ITS_TEST_BOOLEAN,
        isCardMemory: ITS_CARD_MEMORY_BOOLEAN,
        isQuestionBinary: ITS_BINARY_QUESTION_BOOLEAN
      })
      this.loadImageQuestion(relationships)

    }
  }
}
