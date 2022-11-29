export default {
  methods: {
    AssignOpposition () {
      this.$refs['FormCreateOpposition'].validate().then( (status) => {
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
      this.loadingButtonCreateOpposition = true
      this.disabledButtonCreateOpposition = true
      this.AssignOppositionApi()
    },
    async ResetForm() {
      //await this.$refs['FormCreateOpposition']['reset']()
      this.loadingButtonCreateOpposition = false
      this.disabledButtonCreateOpposition = false
      this.$nextTick(() => {
        this.$refs['FormCreateOpposition']['reset']()
      })

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateOpposition']['setErrors'](errorResponse)
    }
  }
}
