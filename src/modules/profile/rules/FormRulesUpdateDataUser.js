import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('requiredDniNie', {
  ...required,
  message: 'Ingresa un DNI/NIE'
})

extend('requiredFirstName', {
  ...required,
  message: 'Ingresa un Nombre'
})

extend('requiredLastName', {
  ...required,
  message: 'Ingresa los Apellidos'
})

extend('requiredPhone', {
  ...required,
  message: 'Ingresa un Teléfono'
})

extend('requiredEmail', {
  ...required,
  message: 'Ingresa un Email'
})

extend('emailValid', {
  validate(value) {
    const pattern = /^[^@]+@[^@]+\.[^@]+$/

    return pattern.test(value) || 'El email no es válido.'
  },
  message: 'Dirección de correo no válida'
})
