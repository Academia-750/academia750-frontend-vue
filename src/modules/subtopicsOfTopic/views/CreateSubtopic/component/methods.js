export default {
  methods: {
    CreateSubtopic () {
      this.$refs['FormCreateSubtopic'].validate().then( (status) => {
        if (!status) {
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

      } )

      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonCreateSubtopic = true
      this.disabledButtonCreateSubtopic = true
      this.CreateSubtopicApi()
    },
    async ResetForm() {
      await this.$refs['FormCreateSubtopic']['reset']()
      this.loadingButtonCreateSubtopic = false
      this.disabledButtonCreateSubtopic = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateSubtopic']['setErrors'](errorResponse)
    }

  }
}
