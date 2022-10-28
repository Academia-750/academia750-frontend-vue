import { extend } from 'vee-validate'

extend('ItMustBeAPhoneNumberFromSpain', {
  validate: (value) => {
    const PATTERN_REGEX = /^[6789]\d{8}$/

    return PATTERN_REGEX.test(value)
  },
  message: 'No es un formato válido para un número de España'
})
