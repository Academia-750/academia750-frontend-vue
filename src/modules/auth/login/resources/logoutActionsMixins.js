import { mapMutations ,mapActions } from 'vuex'
import AuthService from '@/services/AuthService'
import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin'
import ProfileAuthService from '@/services/ProfileAuthService'

export default {
  methods: {
    ...mapMutations('profileService', ['set_user']),
    ...mapActions('loginService', ['logout']),
    async logoutAccount () {
      try {

        if (!this.$manageTokenAuth.$get_token_auth()) {
          this.$router.push({
            name: 'login'
          })

          return
        }

        AuthService.defaults.headers.common['Authorization'] = `Bearer ${this.$manageTokenAuth.$get_token_auth()}`
        await this.logout()

        this.$manageTokenAuth.$remove_token_auth()
        this.set_user(null)

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: '¡Nos vemos pronto!',
          timer: 3000
        })

        AuthService.defaults.headers.common['Authorization'] = null
        ProfileServiceAfterLogin.defaults.headers.common['Authorization'] = null
        ProfileAuthService.defaults.headers.common['Authorization'] = null
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        console.log(error)
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Ha ocurrido un error. Por favor, intente más tarde',
          timer: 3000
        })
      }
    }
  }
}
