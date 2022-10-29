import { extend } from 'vee-validate'

extend('confirmPassword', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'La confirmación de la contraseña no coincide'
})
