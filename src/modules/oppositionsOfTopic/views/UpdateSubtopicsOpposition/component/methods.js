export default {
  methods: {
    UpdateOpposition () {
      this.$refs['FormUpdateOpposition'].validate().then( (status) => {
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
      this.loadingButtonUpdateOpposition = true
      this.disabledButtonUpdateOpposition = true
      this.UpdateOppositionApi()
    },
    async ResetForm() {
      //await this.$refs['FormUpdateOpposition']['reset']()
      this.loadingButtonUpdateOpposition = false
      this.disabledButtonUpdateOpposition = false

      this.$nextTick(() => {
        this.$refs['FormUpdateOpposition']['reset']()
      })

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdateOpposition']['setErrors'](errorResponse)
    }
  }
}
