import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('profileService', ['ChangeMyPasswordAccountAction']),
    changePassword () {
      this.$refs['FormUpdatePassword'].validate().then( (status) => {
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
      this.loadingButtonChangePassword = true
      this.disabledButtonChangePassword = true
      this.changePasswordApi()
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdatePassword']['setErrors'](errorResponse)
    },
    async ResetForm() {
      await this.$refs['FormUpdatePassword']['reset']()

      return true
    },
    notifySecurePasswordGeneratedEvent (PASSWORD_GENERATED) {
      this.passwordGenerate = PASSWORD_GENERATED
    }
  }
}
