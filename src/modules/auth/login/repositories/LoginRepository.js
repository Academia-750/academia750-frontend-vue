import AuthService from '@/services/AuthService.js'

export default {
  login(data, config = {}) {
    return AuthService.post('login', credentials, config)
  },
  logout(config = {}) {
    return AuthService.get('logout', config)
  },
  checkPreviousSession (credentials, config = {}) {
    return AuthService.post('check-previous-session', credentials, config)
  },
  requestChangePasswordApi (data, config = {}) {
    return AuthService.post('passwords-system/users/request-change-password', data, config)
  }
}
