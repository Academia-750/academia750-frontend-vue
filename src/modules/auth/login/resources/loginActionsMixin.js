import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin'
import ProfileAuthService from '@/services/ProfileAuthService'
import { PermissionEnum } from '@/utils/enums'

export default {
  computed: {},
  methods: {
    async signIn() {
      try {
        this.isLoading = true
        this.isDisabled = true

        const credentials = {
          access_key: this.access_key,
          password: this.password
        }

        const response = await this.login(credentials)

        if (response.status === 200) {
          this.hasErrorServiceApp = false
          this.messageErrorServiceApp = ''
          this.$refs['access-key-field']['resetAccessKey']()
          this.$refs['password-field']['resetPassword']()
          this.ResetForm()

          this.$manageTokenAuth.$set_token_auth(response.data.token)
          ProfileServiceAfterLogin.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
          ProfileAuthService.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
          await this.getProfileAfterLogin()
          
          this.$swal.fire({
            icon: 'success',
            toast: true,
            title: '¡Bienvenido!',
            timer: 3000
          })

          this.isLoading = false
          this.isDisabled = false
          this.$loadingApp.disabledLoadingProgressLinear()

          if (this.$hasRoles(['admin']) ) {
            return this.$router.push({
              name: 'manage-students'
            })
          }

          if (
            PermissionEnum.SEE_LESSONS 
          ) {
            this.$router.push({
              name: 'my-lessons'
            })
          }

          if (
            PermissionEnum.GENERATE_TESTS
          ) {
            this.$router.push({
              name: 'generate-questionnaire'
            })
          }
        }
      } catch (error) {
        this.$loadingApp.disabledLoadingProgressLinear()
        this.isLoading = false
        this.isDisabled = false
        //console.log(error)
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.$refs['password-field']['resetPassword']()
          this.$refs['access-key-field']['onFocusAccesKeyField']()
          this.handlingErrorValidation(error.response.data.errors)
          this.ResetForm()
        } else {
          this.actionErrorServiceApp(error.response)
        }
      }
    },
    async getProfileAfterLogin() {
      try {
        this.isLoading = true
        this.isDisabled = true

        await this.getDataMyProfileAction({
          actionAfterLogin: true,
          configResponse: {
            params: {
              include: 'roles,roles-permissions'
            }
          }
        })

      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.isLoading = false
        this.isDisabled = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response.status === 401) {
          this.$swal.fire({
            icon: 'error',
            title: 'Autenticación rechazada. No se ha podido iniciar sesión correctamente.',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 4000
          })
        }
      }
    },
    async checkPreviousSession () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.isLoading = true
        this.isDisabled = true
        const credentials = {
          access_key: this.access_key,
          password: this.password
        }

        const response = await this.checkPreviousSessionAction(credentials)

        if (response.data.thereIsAlreadyAPreviousSession) {
          this.$swal.fire({
            title: 'Existe una sesión ya abierta para este usuario. ¿Desea cerrarla para continuar?',
            showDenyButton: true,
            showCancelButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            allowEnterKey: false,
            confirmButtonText: 'Si deseo continuar',
            denyButtonText: 'No deseo continuar'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.signIn()
            } else {
              this.hasErrorServiceApp = false
              this.messageErrorServiceApp = ''
              this.$refs['access-key-field']['resetAccessKey']()
              this.$refs['password-field']['resetPassword']()
              this.ResetForm()
              this.isLoading = false
              this.isDisabled = false
              this.$loadingApp.disabledLoadingProgressLinear()
            }
          })
        } else {
          this.signIn()
        }

      } catch (error) {
        //console.log(error)
        this.isLoading = false
        this.isDisabled = false
        this.$loadingApp.disabledLoadingProgressLinear()
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.$refs['password-field']['resetPassword']()
          this.$refs['access-key-field']['onFocusAccesKeyField']()
          this.handlingErrorValidation(error.response.data.errors)
          //this.ResetForm()
        }
      }
    }
  }
}
