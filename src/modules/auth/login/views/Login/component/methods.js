import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations('errorsService', ['set_response_error']),
    ...mapActions('loginService', ['login', 'checkPreviousSessionAction']),
    ...mapActions('profileService', ['getDataMyProfileAction']),
    redirectToPageHomeProduction() {
      //location.href = process.env.VUE_APP_BASE_URL_PAGE_HOME_PRODUCTION
      if (this.$router.currentRoute.name !== 'home-website') {
        this.$router.push({
          path: '/'
        })
      }
    },
    async submit() {
      const validateFormStatus = await this.$refs['FormLoginObserver'][
        'validate'
      ]()

      if (!validateFormStatus) {
        this.notificationFormValidationError()

        return
      }

      this.checkPreviousSession()
    },
    notificationFormValidationError() {
      this.$swal.fire({
        icon: 'error',
        title: 'Por favor, complete correctamente los campos del formulario.',
        showConfirmButton: true,
        confirmButtonText: '¡Entendido!',
        timer: 7500
      })
    },
    async ResetForm() {
      //await this.$refs['FormLoginObserver']['reset']()
      /* this.$nextTick(() => {
        this.$refs['FormLoginObserver']['reset']()
      }) */

      return true
    },

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormLoginObserver']['setErrors'](errorResponse)
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
