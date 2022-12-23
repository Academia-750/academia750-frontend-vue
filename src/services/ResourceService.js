import axios from 'axios'
import { activateError } from '@/helpers/manageErrors'
import { $remove_token_auth } from '@/helpers/auth'
import Cookies from 'js-cookie'
import store from '@/store'
import router from '@/router'
import { $disconnectWebsocketsConnection } from '@/helpers/WebsocketsConnection'

const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION

const AuthService = axios.create({
  baseURL: `${IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction}/api/v1`
})

const handleErrorResponse = (error) => {
  if (error.message === 'Network Error') {
    activateError({
      status: 500,
      message: 'Ha ocurrido un error en la aplicacion. Por favor intente más tarde.'
    })

    return Promise.reject(error)
  }

  const isNotValidationErrorOrRejectAuthOrRejectAttemps =
    error.response.status !== 401 &&
    error.response.status !== 422

  if (isNotValidationErrorOrRejectAuthOrRejectAttemps) {
    activateError({
      status: error.response ? error.response.status : 500,
      message: error.response
        ? error.response.data.message
          ? error.response.data.message
          : error.response.statusText
        : 'Ha ocurrido un error en la aplicacion. Por favor intente más tarde.'
    })
  }

  if (error.response.status === 401) {
    /* console.log(Cookies.get('authorization')) */
    if (Cookies.get('authorization')) {
      $remove_token_auth()
      $disconnectWebsocketsConnection()
    }

    /* console.log('Error en el Resource Service') */
    store.commit('profileService/set_user', null)
    /* activateError({
      status: 500,
      message: 'No hay autorizacion previa para el proceso'
    }) */

    if (router.currentRoute.name !== 'home-website') {
      router.push({
        name: 'home-website'
      })
    }

  }

  return Promise.reject(error)
}

AuthService.interceptors.response.use(
  (response) => response,
  handleErrorResponse
)

export default AuthService
