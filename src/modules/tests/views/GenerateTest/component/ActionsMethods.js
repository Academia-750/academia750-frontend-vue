import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('testsService', ['createAQuiz']),
    async CreateTestApi() {
      try {
        const response = await this.createAQuiz({
          data: {
            'opposition_id': this.oppositionSelected[0].id,
            'count_questions_for_test': this.numberOfQuestionsSelected,
            'test_type': this.typeTestSelected,
            'topics_id': this.topicsSelected.map((topic) => topic.id)
          },
          config: {}
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateTest = false
        this.disabledButtonCreateTest = false

        if (this.typeTestSelected === 'test') {

          this.$swal.fire({
            icon: 'success',
            toast: true,
            title: '¡Buena suerte con tu Test!',
            timer: 10000
          })

          this.$router.push({ name: 'fetch-questionnaire', params: { id: response.data.data.id } })
        }

        if (this.typeTestSelected === 'card_memory') {

          this.$router.push({ name: 'fetch-card-memory', params: { id: response.data.data.id } })
        }
      } catch (error) {
        console.log(error)
        this.$swal.fire({
          icon: 'error',
          title: 'Tu Test no ha sido generado con éxito. Por favor, notifícalo al correo oficial de la academia.',
          showConfirmButton: true,
          confirmButtonText: '¡Entendido!',
          timer: 7500
        })
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateTest = false
        this.disabledButtonCreateTest = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.ResetForm()
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    }
  }
}
