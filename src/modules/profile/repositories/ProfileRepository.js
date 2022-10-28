import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin.js'
import ProfileAuthService from '@/services/ProfileAuthService'

export default {
  getDataMyProfileAfterLogin(config = {}) {
    return ProfileServiceAfterLogin.get('auth/my-profile', config)
  },
  getDataMyProfileBeforeLoadApp(config = {}) {
    return ProfileAuthService.get('auth/my-profile', config)
  },
  updateDataMyProfile(data, config = {}) {
    return ProfileAuthService.post('auth/update-data-my-profile', data, config)
  },
  changePassword(data, config = {}) {
    return ProfileAuthService.post('auth/change-password-my-account', data, config)
  }

}
