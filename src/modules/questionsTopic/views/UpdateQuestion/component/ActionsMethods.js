import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsTopicService', ['fetchQuestion','updateQuestion', 'setEditModeQuestion']),
    async UpdateQuestionApi() {
      try {
        const FormDataQuestion = this.getFormDataForSaveQuestion()

        await this.updateQuestion({
          topic_id: this.$route.params.id,
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
          name: 'manage-questions-of-topic',
          params: {
            id: this.$route.params.id
          }
        })
        //this.ResetForm()
      } catch (error) {
        //console.log(error)
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
        this.disabledButtonUpdateQuestion = false

      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateQuestion = false
      }
    },
    async setEditModeQuestionApi (question_id, isModeEdition) {
      try {
        const response = await this.setEditModeQuestion({
          question_id: question_id,
          data: {
            'is-mode-edition-question': isModeEdition
          },
          config: {}
        })
      } catch (error) {
        //console.log(error)
      }
    }
  }
}
