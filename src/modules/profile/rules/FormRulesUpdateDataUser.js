import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('requiredFirstName', {
  ...required,
  message: 'Ingresa un Nombre'
})

extend('maxlengthFirstName', {
  validate(value, { length }) {
    return value.length <= length || `Ingrese un nombre no mayor a ${length} caracteres.`
  },
  params: ['length']
})

extend('minlengthFirstName', {
  validate(value, { length }) {
    return value.length >= length || `Ingrese un nombre no menor a ${length} caracteres.`
  },
  params: ['length']
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

extend('emailValid', {
  validate(value) {
    const pattern = /^[^@]+@[^@]+\.[^@]+$/

    return pattern.test(value) || 'El email no es válido.'
  },
  message: 'Dirección de correo no válida'
})
