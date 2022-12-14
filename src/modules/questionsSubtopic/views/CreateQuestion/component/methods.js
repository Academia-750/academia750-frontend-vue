export default {
  methods: {
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateQuestion']['setErrors'](errorResponse)
    },
    async ResetForm() {

      this.loadingButtonCreateQuestion = false
      this.disabledButtonCreateQuestion = false

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

      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonCreateQuestion = true
      this.disabledButtonCreateQuestion = true
      this.CreateQuestionApi()
    }

  }
}
