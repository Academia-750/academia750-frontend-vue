import Vue from 'vue'
import Cookies from 'js-cookie'

const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
const DOMAIN_APP_DEVELOPMENT = process.env.VUE_APP_BASE_URL_DOMAIN_DEVELOPMENT
const DOMAIN_APP_PRODUCTION = process.env.VUE_APP_BASE_URL_DOMAIN_PRODUCTION

export const $set_token_auth = function (token) {
  const tokenPlainEncrypt = Vue.CryptoJS.AES.encrypt(token, process.env.VUE_APP_SECRET_KEY_DESCRYPT_TOKEN).toString()

  const options = {
    expires: 3,
    domain: IsDevelopmentEnviroment ? DOMAIN_APP_DEVELOPMENT : DOMAIN_APP_PRODUCTION,
    sameSite: 'Lax'
  }

  /* console.log('Colocando la Cookie')
  console.log({ options }) */

  Cookies.set('authorization', tokenPlainEncrypt, options)
}

export const $get_token_auth = function () {

  return (Cookies.get('authorization')) ? 'Bearer ' + Vue.CryptoJS.AES.decrypt(Cookies.get('authorization'), process.env.VUE_APP_SECRET_KEY_DESCRYPT_TOKEN).toString(Vue.CryptoJS.enc.Utf8) : null
}

export const $remove_token_auth = function () {
  /* const options = {
    domain: IsDevelopmentEnviroment ? DOMAIN_APP_DEVELOPMENT : DOMAIN_APP_PRODUCTION
  } */
  const options = {
    expires: 3,
    domain: IsDevelopmentEnviroment ? DOMAIN_APP_DEVELOPMENT : DOMAIN_APP_PRODUCTION,
    sameSite: 'Lax'
  }

  /* console.log(Cookies.get('authorization'))
  console.log('Remover token') */

  Cookies.remove('authorization', options)
}

export default {
  $set_token_auth,
  $get_token_auth,
  $remove_token_auth
}
