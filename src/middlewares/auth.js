import Cookies from 'js-cookie'
import { $get_token_auth } from '@/helpers/auth'
import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin'
import ProfileAuthService from '@/services/ProfileAuthService'

export default function ({ next }) {
  //console.log(store.getters['profile/get_roles'])
  if (!Cookies.get('authorization')) {
    return next({
      name: 'login'
    })
  }
  ProfileServiceAfterLogin.defaults.headers.common['Authorization'] = `Bearer ${$get_token_auth()}`
  ProfileAuthService.defaults.headers.common['Authorization'] = `Bearer ${$get_token_auth()}`

  return next()

}
