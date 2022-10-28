import { extend } from 'vee-validate'

extend('mustContainLettersAndOptionalTilde', {
  validate: (value) => {
    const PATTERN_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/

    return PATTERN_REGEX.test(value)
  },
  message: 'Debe contener solo letras con o sin tíldes'
})
