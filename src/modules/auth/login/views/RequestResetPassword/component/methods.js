import { mapMutations, mapActions } from 'vuex'
import configLogoutMethods from '@/modules/auth/login/resources/configLogout'

export default {
  methods: {
    ...configLogoutMethods,
    ...mapMutations('errorsService', ['set_response_error']),
    ...mapActions('loginService', ['requestChangePasswordApi', 'checkPreviousSessionAction']),
    ...mapActions('profileService', ['getDataMyProfileAction']),
    redirectToPageHomeProduction() {
      //location.href = process.env.VUE_APP_BASE_URL_PAGE_HOME_PRODUCTION
      if (this.$router.currentRoute.name !== 'home-website') {
        this.$router.push({
          path: '/'
        })
      }
    },
    async submit($event) {
      $event?.preventDefault()
      const validateFormStatus = await this.$refs['FormRequestResetPasswordObserver'][
        'validate'
      ]()

      if (!validateFormStatus) {
        this.notificationFormValidationError()

        return
      }

      this.sendRequestChangePassword()
    },
    async sendRequestChangePassword() {
      try {
        this.isLoading = true
        this.isDisabled = true

        const data = {
          email: this.access_key
        }

        const response = await this.requestChangePasswordApi({
          data,
          config: {}
        })

        if (response.status === 200) {
          this.hasErrorServiceApp = false
          this.messageErrorServiceApp = ''

          this.$manageTokenAuth.$remove_token_auth()

          const { message, status } = response.data

          if (status === 'successfully') {
            this.$swal.fire({
              icon: 'success',
              toast: true,
              title: message,
              timer: 10000
            })

            this.ResetForm()
          }

          if (status === 'failed') {
            this.$swal.fire({
              icon: 'error',
              toast: true,
              title: message,
              timer: 10000
            })

            this.isLoading = false
            this.isDisabled = false
            this.$loadingApp.disabledLoadingProgressLinear()

            return
          }

          this.$refs['email-field']['resetAccessKey']()
          this.ResetForm()

          /* this.$swal.fire({
            icon: 'success',
            toast: true,
            title: 'Tu solicitud ha sido enviada. Podeís revisar tu bandeja de mail para obtener tu nueva contraseña',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 10000
          }) */

          this.isLoading = false
          this.isDisabled = false
          this.$loadingApp.disabledLoadingProgressLinear()
        }
      } catch (error) {
        this.$loadingApp.disabledLoadingProgressLinear()
        this.isLoading = false
        this.isDisabled = false
        console.log(error)
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
          this.ResetForm()
        } else if (error.response?.status === 422) {
          this.$refs['password-field']['resetPassword']()
          this.$refs['access-key-field']['onFocusAccesKeyField']()
          this.handlingErrorValidation(error.response.data.errors)
        } else {
          this.actionErrorServiceApp(error.response)
          this.ResetForm()
        }
      }
    },
    notificationFormValidationError() {
      this.$swal.fire({
        toast: true,
        icon: 'error',
        title: 'Por favor, complete correctamente los campos del formulario.',
        showConfirmButton: true,
        confirmButtonText: '¡Entendido!',
        timer: 7500
      })
    },
    async ResetForm() {
      //await this.$refs['FormRequestResetPasswordObserver']['reset']()
      /* this.$nextTick(() => {
        this.$refs['FormRequestResetPasswordObserver']['reset']()
      }) */
      this.isLoading = false
      this.isDisabled = false
      this.$refs['email-field']['resetAccessKey']()

      this.$nextTick(() => {
        this.$refs['FormRequestResetPasswordObserver']['reset']()
      })

      return true
    },

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormRequestResetPasswordObserver']['setErrors'](errorResponse)
    },
    actionErrorServiceApp(errorResponse) {
      this.hasErrorServiceApp = false
      this.messageErrorServiceApp = ''
      this.$refs['access-key-field']['resetAccessKey']()
      this.$refs['password-field']['resetPassword']()
      this.ResetForm()
      if (errorResponse.status === 429) {
        this.hasErrorServiceApp = true
        this.messageErrorServiceApp =
          '¡Opps! Has excecido el número de intentos. Intenta nuevamente después de 1 minuto'
        //this.$refs['access-key-field']['resetAccessKey']()
        this.ResetForm()
        this.$refs['password-field']['onBlurPasswordField']()
      } else {
        this.hasErrorServiceApp = true
        this.messageErrorServiceApp =
          '¡Opps! Su solicitud no puede ser procesada por ahora. Intente de nuevo, más tarde o reporte el problema.'
      }
    }
  }
}
