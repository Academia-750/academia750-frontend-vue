import AuthService from '@/services/AuthService.js'

export default {
  login(credentials, config = {}) {
    return AuthService.post('login', credentials, config)
  },
  logout(config = {}) {
    return AuthService.get('logout', config)
  },
  checkPreviousSession (credentials, config = {}) {
    return AuthService.post('check-previous-session', credentials, config)
  }
}
