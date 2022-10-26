import LoginRepository from '../repositories/LoginRepository'

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
