import ProfileRepository from '../repositories/ProfileRepository'

const getDataMyProfileAction = async ({ commit }, options) => {

  try {
    commit('set_user', null)

    let response = null

    if (options.actionAfterLogin) {
      response = await ProfileRepository.getDataMyProfileAfterLogin(options.configResponse)
    } else {
      response = await ProfileRepository.getDataMyProfileBeforeLoadApp(options.configResponse)
    }

    if (response) {
      commit('set_user', response.data.data)
    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)
    commit('set_user', null)

    return Promise.reject(error)
  }
}

const UpdateProfileAction = async ({ commit }, options) => {

  try {
    const response = await ProfileRepository.updateDataMyProfile(options.data, options.config)

    if (response) {
      console.log(response.data.data)
      commit('set_user', response.data.data)
    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const UnsubscribeSystemAction = async ({ commit }, config) => {

  try {
    const response = await ProfileRepository.unsubscribeSystem(config)

    if (response) {
      commit('set_user', null)
    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getDataMyProfileAction,
  UpdateProfileAction,
  UnsubscribeSystemAction
}
