import Vue from 'vue'
//import { required, email, max, min, confirmed, dimensions, size, mimes } from 'vee-validate/dist/rules'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
/* import errorsValidation from '@/components/errors/ErrorsValidationForm'
import errorsValidationImportData from '@/components/errors/ErrorsValidationImportData' */
import * as rules from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import es from 'vee-validate/dist/locale/es.json'
import VueI18n from '@/plugins/vue-i18n'

// Install English and Spanish locales.
localize({
  en,
  es
})

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

/* // with typescript
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}
 */
// Set Locale Config VueI18n in @/configs/locales.js

//console.log(VueI18n.locale)
localize(VueI18n.locale ?? 'es')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.prototype.$extendVeeValidate = extend

// Personalizar mensajes de cada regla de validacion de forma predeterminada

/* extend('required', {
  ...required,
  message: '{_field_} es requerido obligatoriamente'
})

extend('max', {
  ...max,
  message: '{_field_} no debe ser mayor a {length} caracteres'
})

extend('min', {
  ...min,
  message: '{_field_} no debe ser menor a {length}'
})

extend('email', {
  ...email,
  message: 'Debe ser un correo electronico valido'
})

extend('confirmed', {
  ...confirmed,
  message: 'El campo {_field_} no coincide con tu registro.'
})

extend('dimensions', {
  ...dimensions,
  message: 'El campo {_field_} debe contener una imagen con los tamaños/dimensiones adecuadas.'
})

extend('size', {
  ...size,
  message: 'El campo {_field_} debe contener un tamaño maximo de {size} en Kilobytes.'
})

extend('mimes', {
  ...mimes,
  message: 'El campo {_field_} debe contener un archivo o un valor con las extensiones adecuadas.'
}) */

/* Vue.component('errors-validation-form', errorsValidation)
Vue.component('errors-validation-import-data', errorsValidationImportData) */
