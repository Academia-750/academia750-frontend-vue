export default {
  methods: {
    UpdateSubtopic () {

      this.$refs['FormUpdateSubtopic'].validate().then( (status) => {
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
      this.loadingButtonUpdateSubtopic = true
      this.disabledButtonUpdateSubtopic = true
      this.UpdateSubtopicApi()
    },
    async ResetForm() {
      await this.$refs['FormUpdateSubtopic']['reset']()
      this.loadingButtonUpdateSubtopic = false
      this.disabledButtonUpdateSubtopic = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdateSubtopic']['setErrors'](errorResponse)
    }
  }
}
