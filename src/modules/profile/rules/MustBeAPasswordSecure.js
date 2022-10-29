import { extend } from 'vee-validate'

extend('ItMustBeAPasswordSecure', {
  validate: (value) => {
    const PATTERN_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])([A-Za-z\d$@$!%*?&#]|[^ ]){8,15}$/

    return PATTERN_REGEX.test(value)
  },
  message: 'Proporciona una contraseña segura que cumpla los requerimientos'
})
