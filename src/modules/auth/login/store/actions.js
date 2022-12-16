import LoginRepository from '../repositories/LoginRepository'
import { $disconnectWebsocketsConnection } from '@/helpers/WebsocketsConnection'
import store from '@/store'

const login = async (optionsVuex = {}, credentials) => {

  try {

    const response = await LoginRepository.login(credentials)

    return Promise.resolve(response)

  } catch (error) {
    /* commit('reset_values') */

    return Promise.reject(error)
  }
}

const logout = async () => {
  try {

    const response = await LoginRepository.logout()

    $disconnectWebsocketsConnection(store.state.profileService.user.id)

    return Promise.resolve(response)

  } catch (error) {

    return Promise.reject(error)
  }

}

const checkPreviousSessionAction = async (VuexContext, credentials) => {
  try {
    const response = await LoginRepository.checkPreviousSession(credentials)

    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  login, logout, checkPreviousSessionAction
}
