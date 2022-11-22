import { extend } from 'vee-validate'

extend('ItMustBeADniOrNieFromSpain', {
  validate: (value) => {
    const PATTERN_REGEX = /^\d{8}[a-zA-Z]$/

    return PATTERN_REGEX.test(value)
  },
  message: 'Este no es un DNI válido para Ciudadano de España'
})
