import axios from 'axios'
import { activateError } from '@/helpers/manageErrors'
import { $remove_token_auth } from '@/helpers/auth'
import Cookies from 'js-cookie'
import store from '@/store'
import router from '@/router'

const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION

const AuthService = axios.create({
  baseURL: `${IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction}/api/v1`
})

const handleErrorResponse = (error) => {
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
    if (Cookies.get('authorization')) {
      $remove_token_auth()
    }

    store.commit('profileService/set_user', null)
    router.push({
      name: 'login'
    })
  }

  return Promise.reject(error)
}

AuthService.interceptors.response.use(
  (response) => response,
  handleErrorResponse
)

export default AuthService
