/* eslint-disable */
import Cookies from 'js-cookie'
import { $get_token_auth } from '@/helpers/auth'
import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin'
import ProfileAuthService from '@/services/ProfileAuthService'
import ResourceService from '@/services/ResourceService'
import { /* $websocketConnectionAction,  */$disconnectWebsocketsConnection } from '@/helpers/WebsocketsConnection'

export default function ({ next }) {

  try {
    /* console.log(Cookies.get('authorization')) */

    if (!Cookies.get('authorization')) {
      $disconnectWebsocketsConnection()

      return next({
        name: 'login'
      })
    }

    const TOKEN_AUTH = `Bearer ${$get_token_auth()}`

    ProfileServiceAfterLogin.defaults.headers.common['Authorization'] = TOKEN_AUTH
    ProfileAuthService.defaults.headers.common['Authorization'] = TOKEN_AUTH
    ResourceService.defaults.headers.common['Authorization'] = TOKEN_AUTH

    //$websocketConnectionAction()

    return next()
  } catch (error) {
    /* console.log(Cookies.get('authorization'))
    console.log('Error en middleware Auth') */
    console.log(error)
    activateError()
  }

}
