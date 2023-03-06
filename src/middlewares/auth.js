/* eslint-disable */
import Cookies from 'js-cookie'
import { $get_token_auth } from '@/helpers/auth'
import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin'
import ProfileAuthService from '@/services/ProfileAuthService'
import ResourceService from '@/services/ResourceService'
import { /* $websocketConnectionAction,  */$disconnectWebsocketsConnection } from '@/helpers/WebsocketsConnection'
import configLogout from '@/modules/auth/login/resources/configLogout'

export default function ({ next }) {

  try {
    /* //console.log(Cookies.get('authorization')) */

    if (!Cookies.get('authorization')) {
      //console.log('bhnasfosahf')
      //$disconnectWebsocketsConnection()

      //configLogout.redirectToHomePageAfterLogout()

      return next({
        name: 'login'
      })
    }

    /* const AUTH_SESSION_ID = Cookies.get('_academia_session_id')
    const AUTH_KEEP_PERSISTENT_ID = Cookies.get('_academia_persistent_id')
    const sessionIDRoute = this.$route.query._academia_session_id
    const sessionPersistentIDRoute = this.$route.query._academia_persistent_id */

    /* if (!AUTH_SESSION_ID && !AUTH_KEEP_PERSISTENT_ID && sessionIDRoute && sessionPersistentIDRoute) {
      Cookies.set('_academia_session_id', sessionIDRoute)
      Cookies.set('_academia_persistent_id', sessionPersistentIDRoute)
    } */

    const TOKEN_AUTH = `Bearer ${$get_token_auth()}`

    ProfileServiceAfterLogin.defaults.headers.common['Authorization'] = TOKEN_AUTH
    ProfileAuthService.defaults.headers.common['Authorization'] = TOKEN_AUTH
    ResourceService.defaults.headers.common['Authorization'] = TOKEN_AUTH

    //$websocketConnectionAction()

    return next()
  } catch (error) {
    /* //console.log(Cookies.get('authorization'))
    //console.log('Error en middleware Auth') */
    configLogout.redirectToHomePageAfterLogout()
    //console.log(error)
    activateError()
  }

}
