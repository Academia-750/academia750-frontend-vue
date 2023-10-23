import axios from 'axios'
import { activateError } from '@/helpers/manageErrors'
import { $remove_token_auth } from '@/helpers/auth'
import Cookies from 'js-cookie'
import store from '@/store'
import Swal from 'sweetalert2/dist/sweetalert2'
import Vue from 'vue'
import { $disconnectWebsocketsConnection } from '@/helpers/WebsocketsConnection'
import configLogoutMethods from '@/modules/auth/login/resources/configLogout'

const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION

const BaseURIApi = IsDevelopmentEnviroment
  ? serverApiDevelopment
  : serverApiProduction

const ResourceService = axios.create({
  baseURL: `${BaseURIApi}/api/v1`
})

const handleErrorResponse = (error) => {
  if (error.message === 'Network Error') {
    activateError({
      status: 500,
      message:
        'Ha ocurrido un error en la aplicación. Por favor intentelo más tarde.'
    })

    return Promise.reject(error)
  }

  if (error.response.status === 401) {
    if (Cookies.get('authorization')) {
      $remove_token_auth()
      $disconnectWebsocketsConnection()
      Vue.swal.fire({
        icon: 'error',
        toast: true,
        title: 'Su sesión ha expirado. Inicia sesión nuevamente.',
        timer: 10000
      })
    }

    store.commit('profileService/set_user', null)

    configLogoutMethods.redirectToHomePageAfterLogout()

    return Promise.resolve(error.response)
  }

  if (error.response.status === 500) {
    activateError({
      status: 500,
      message: error.response
        ? error.response.data.message
          ? error.response.data.message
          : error.response.statusText
        : 'Ha ocurrido un error en la aplicacion. Por favor intente más tarde.'
    })
  }

  return Promise.resolve(error.response)
}

ResourceService.interceptors.response.use(
  (response) => response,
  handleErrorResponse
)

ResourceService.warning = ({ response, title, message }) => {
  // Default handling
  if (!title && !message) {
    // 401 are already handled by the general wrapper
    if (response.status === 401) return
  }

  Swal.fire({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    icon: 'warning',
    title: title || `${response.status} ${response.statusText}`,
    text:
      message === '' // Allow Empty message
        ? ''
        : message || response.data?.message || response.data?.error || ''
  })
}
export default ResourceService
