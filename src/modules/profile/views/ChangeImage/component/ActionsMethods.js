export default {
  methods: {
    async updateImageAccountApi () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.loadingButtonChangeImageAccount = true
        this.disabledButtonChangeImageAccount = true
        const FormDataImageAccount = new FormData()

        FormDataImageAccount.append('image', this.image)

        await this.ChangeImageMyAccountProfile({
          data: FormDataImageAccount,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Tus imagen/foto ha sido actualizada con éxito.',
          timer: 3000
        })

        this.reloadImageByPath()
        this.ResetForm()
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonChangeImageAccount = false
        this.disabledButtonChangeImageAccount = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonChangeImageAccount = false
        this.disabledButtonChangeImageAccount = false
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
