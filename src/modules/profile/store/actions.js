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
    //console.log(error)
    commit('set_user', null)

    return Promise.reject(error)
  }
}

const UpdateProfileAction = async ({ commit }, options) => {

  try {
    const response = await ProfileRepository.updateDataMyProfile(options.data, options.config)

    if (response) {
      commit('set_user', response.data.data)
    }

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

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
    //console.log(error)

    return Promise.reject(error)
  }
}

const ChangeMyPasswordAccountAction = async (_, options) => {

  try {
    const response = await ProfileRepository.changePassword(options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const ChangeImageMyAccountProfile = async (_, options) => {

  try {
    const response = await ProfileRepository.changeImageAccount(options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const mapItemsNotifications = (notifications = []) => {
  return notifications.map((notification) => {
    const { body } = notification.attributes

    return {
      id: notification.id,
      title: body['title-notification'],
      color: body['color-icon'],
      icon: body.icon,
      subtitle: body['message-notification'],
      time: notification.attributes['created-at-diff'],
      routeTo: body.route,
      has_read_notification: notification.attributes['read-at'] !== null
    }
  })
}

const getNotifications = async ({ commit }, options) => {
  try {
    commit('set_count_notifications_unread', '...')
    commit('set_notifications', [])

    const response = await ProfileRepository.getNotifications(options.config)

    commit('set_notifications', mapItemsNotifications(response.data.data))
    commit('set_count_notifications_unread', response.data.meta.unread_notifications_count.toString())

    return Promise.resolve(response)

  } catch (error) {
    commit('set_notifications', [])
    commit('set_count_notifications_unread', '0')

    //console.log(error)

    return Promise.reject(error)
  }
}

const readNotification = async (_, options) => {
  try {
    const response = await ProfileRepository.readNotification(options.notification_id, options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getDataMyProfileAction,
  UpdateProfileAction,
  UnsubscribeSystemAction,
  ChangeMyPasswordAccountAction,
  getNotifications,
  readNotification,
  ChangeImageMyAccountProfile
}
