export default {
  methods: {
    async changePasswordApi () {
      try {
        await this.ChangeMyPasswordAccountAction({
          data: {
            'current-password': this.$refs['CurrentPasswordField'].currentPassword,
            'password': this.$refs['PasswordField'].password,
            'password_confirmation': this.$refs['PasswordConfirmationField'].password
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Tu contraseña ha sido actualizada con éxito.',
          timer: 3000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonChangePassword = false
        this.disabledButtonChangePassword = false

        this.$refs['CurrentPasswordField'].resetField()
        this.$refs['PasswordField'].resetField()
        this.$refs['PasswordConfirmationField'].resetField()
        this.ResetForm()
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonChangePassword = false
        this.disabledButtonChangePassword = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          //this.ResetForm()
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    }
  }
}
