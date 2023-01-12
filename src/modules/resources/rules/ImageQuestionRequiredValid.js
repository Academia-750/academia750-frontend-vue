import { extend } from 'vee-validate'
import { required, image } from 'vee-validate/dist/rules'

extend('ImageQuestionRequiredMaxSize', {
  validate(value) {
    if (!value) {
      return true
    }

    return value.size <= 10000000
  },
  message: 'El tamaño de la imagen no debe ser mayor a 10 mb'
})

extend('IsValidImageQuestion', {
  ...image,
  message: 'Ingresa una imagen válida para la pregunta'
})

extend('requiredReasonTextQuestion', {
  ...required,
  message: 'Ingresa una explicación'
})
