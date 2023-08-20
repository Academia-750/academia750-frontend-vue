import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
  Validator
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import es from '@/translations/Vee-Validate/es.json'
import VueI18n from '@/plugins/vue-i18n'
import moment from 'moment'

// Install English and Spanish locales.
localize({
  en,
  es
})

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

extend('valid_date', {
  validate: (value) => moment(value).isValid(),
  message: 'La fecha no es válida'
})

extend('before', {
  validate: (value, { target }) => value < target,
  message: 'El valor debe ser inferior a {field}',
  params: ['target', 'field']
})

extend('url', {
  validate: (value) =>
    value.match(/^http(s)?:\/\/[a-z0-9A-Z_-]+\.[a-z0-9A-Z]{1,}./),
  message: 'No es una URL válida'
})

extend('after', {
  validate: (value, { target }) => value > target,
  message: 'El valor debe ser posterior a {field}',
  params: ['target', 'field']
})

localize(VueI18n.locale ?? 'es')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.prototype.$extendVeeValidate = extend
