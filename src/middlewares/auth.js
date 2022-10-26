/* eslint-disable */
import Cookies from 'js-cookie'
import { $get_token_auth } from '@/helpers/auth'
import ProfileServiceAfterLogin from '@/services/ProfileServiceAfterLogin'
import ProfileAuthService from '@/services/ProfileAuthService'
import { activateError } from '@/helpers/manageErrors'
import store from '@/store'

export default function ({ next }) {

  try {
    if (!Cookies.get('authorization')) {
      return next({
        name: 'login'
      })
    }
    ProfileServiceAfterLogin.defaults.headers.common['Authorization'] = `Bearer ${$get_token_auth()}`
    ProfileAuthService.defaults.headers.common['Authorization'] = `Bearer ${$get_token_auth()}`

    return next()
  } catch (error) {
    console.log(error)
    activateError()
  }

}
