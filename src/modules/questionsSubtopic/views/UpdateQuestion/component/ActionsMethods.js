import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsSubtopicService', ['fetchQuestion','updateQuestion']),
    async UpdateQuestionApi() {
      try {
        const FormDataQuestion = this.getFormDataForSaveQuestion()

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
