/* eslint-disable */
import Cookies from 'js-cookie'
import { $get_token_auth } from '@/helpers/auth'
import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin'
import ProfileAuthService from '@/services/ProfileAuthService'
import ResourceService from '@/services/ResourceService'
import { $websocketConnectionAction } from '@/helpers/WebsocketsConnection'
//import store from '@/store'

export default function ({ next }) {

  try {
    if (!Cookies.get('authorization')) {
      return next({
        name: 'login'
      })
    }

    const TOKEN_AUTH = `Bearer ${$get_token_auth()}`

    ProfileServiceAfterLogin.defaults.headers.common['Authorization'] = TOKEN_AUTH
    ProfileAuthService.defaults.headers.common['Authorization'] = TOKEN_AUTH
    ResourceService.defaults.headers.common['Authorization'] = TOKEN_AUTH

    $websocketConnectionAction()

    return next()
  } catch (error) {
    console.log(error)
    activateError()
  }

}
