import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsTopicService', ['fetchQuestion','createQuestion', '`setEditModeQuestion`']),
    async CloneQuestionApi() {
      try {
        const FormDataQuestion = this.getFormDataForSaveQuestion()
        
        await this.createQuestion({
          topic_id: this.$route.params.id,
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
        this.loadingButtonCreateQuestion = false
        this.disabledButtonCreateQuestion = false

        this.ResetForm()
      } catch (error) {
        // console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateQuestion = false
        this.disabledButtonCreateQuestion = false
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
    async fetchDataQuestionForClone() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonCreateQuestion = true

        const response = await this.fetchQuestion({
          topic_id: this.$route.params.id,
          question_id: this.$route.params.question_id,
          config: {
            params: {
              include: 'image,answers'
            }
          }
        })

        this.syncValuesForm(response)

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonCreateQuestion = false

      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonCreateQuestion = false
      }
    },
    async setCloneModeQuestionApi (question_id, isModeEdition) {
      try {
        const response = await this.setEditModeQuestion({
          question_id: question_id,
          data: {
            'is-mode-edition-question': isModeEdition
          },
          config: {}
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
