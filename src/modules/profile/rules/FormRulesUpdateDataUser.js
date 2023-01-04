import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('requiredFirstName', {
  ...required,
  message: 'Ingresa un Nombre'
})

extend('requiredLastName', {
  ...required,
  message: 'Ingresa los apellidos'
})

extend('requiredPhone', {
  ...required,
  message: 'Ingresa un número de teléfono'
})

extend('requiredEmail', {
  ...required,
  message: 'Ingresa un email'
})
