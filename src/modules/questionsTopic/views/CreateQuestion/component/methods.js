export default {
  methods: {
    bindingCheckGroupAnswer({ value, uuid }) {
      if (!value) {
        this.answerGrouperSelected = ''

        return
      }

      this.answerGrouperSelected = uuid
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
