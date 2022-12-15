import Cookies from 'js-cookie'
import store from '@/store'
import { $get_token_auth } from '@/helpers/auth'
import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin'
import ProfileAuthService from '@/services/ProfileAuthService'
import { enableLoadingProgressCircular, disabledLoadingProgressCircular } from '@/helpers/manageLoading'

export const loadUserAuth = async () => {
  if (Cookies.get('authorization')) {
    try {
      enableLoadingProgressCircular()
      ProfileServiceAfterLogin.defaults.headers.common['Authorization'] = `Bearer ${$get_token_auth()}`
      ProfileAuthService.defaults.headers.common['Authorization'] = `Bearer ${$get_token_auth()}`
      await store.dispatch('profileService/getDataMyProfileAction', {
        actionAfterLogin: false,
        configResponse: {
          params: {
            include: 'image,roles,roles-permissions'
          }
        }
      })

      disabledLoadingProgressCircular()
    } catch (error) {
      disabledLoadingProgressCircular()
      console.log(error)
    }
  }
}

export const getUserAuth = () => {
  return store.getters['profileService/get_user_authenticated']
}

export const getRolesUserAuth = () => {
  return store.getters['profileService/get_roles']
}

export const getPermissionsUserAuth = () => {
  return store.getters['profileService/get_permissions']
}
