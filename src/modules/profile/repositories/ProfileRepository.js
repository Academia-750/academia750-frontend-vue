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
  unsubscribeSystem(config = {}) {
    return ProfileAuthService.get('auth/unsubscribe-from-system', config)
  },
  changePassword(data, config = {}) {
    return ProfileAuthService.post('auth/change-password-my-account', data, config)
  },
  getNotifications(config = {}) {
    return ProfileAuthService.get('notifications/user', config)
  },
  readNotification(notification_id, data = {}, config = {}) {
    return ProfileAuthService.post(`/read/notification/${notification_id}/user`, data, config)
  }

}
