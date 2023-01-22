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
    loadImageQuestion (relationships) {
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
    },
    loadAnswersQuestion (dataAnswers, { isTest, isCardMemory, isQuestionBinary }) {

      if (isCardMemory) {
        /* const answerCorrect = dataAnswers.find((answer) => answer.attributes.is_correct_answer === 'yes')

        const dataAnswersFiltered = dataAnswers.find((answer) => answer.attributes.is_correct_answer === 'no')

        this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value = answerCorrect.answer_text
        this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value = dataAnswersFiltered.answer_text */
      }

      console.log(dataAnswers)

      console.log(this.$refs)
      console.log(this.$refs['FormAnswerCorrectFieldOfQuestionBinary'])
      console.log(this.$refs['FormAnswerAnotherFieldOfQuestionBinary'])

      console.log({
        isTest,
        isCardMemory,
        isQuestionBinary
      })

      /* console.log(answerCorrect)
      console.log(dataAnswersFiltered) */

      /* console.log(dataAnswers) */

      /* this.$refs['FormAnswerCorrectField'].answer_id = answerCorrect[0].id
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
      this.$refs['FormAnswerThreeField'].is_grouper_answer = dataAnswers[2].attributes.is_grouper_answer === 'yes' */
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

      this.questionData = response.data
      this.topicData = topic

      this.isCardMemoryQuestion = ITS_CARD_MEMORY_BOOLEAN
      this.isTestQuestion = ITS_TEST_BOOLEAN
      this.isQuestionBinary = ITS_BINARY_QUESTION_BOOLEAN

      this.$refs['FormQuestionTypeTestCheckbox'].is_test = ITS_TEST_BOOLEAN
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = ITS_CARD_MEMORY_BOOLEAN
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = ITS_VISABLE_QUESTION_BOOLEAN

      this.answerGrouperSelected = ''
      this.dataAnswersUuid = [
        this.generateUUID(),
        this.generateUUID(),
        this.generateUUID(),
        this.generateUUID()
      ]

      this.$refs['FormReasonTextArea'].reason_value = attributes['reason-text']

      this.loadAnswersQuestion(relationships.answers.data, {
        isTest: ITS_TEST_BOOLEAN,
        isCardMemory: ITS_CARD_MEMORY_BOOLEAN,
        isQuestionBinary: ITS_BINARY_QUESTION_BOOLEAN
      })
      this.loadImageQuestion(relationships)

    }
  }
}
