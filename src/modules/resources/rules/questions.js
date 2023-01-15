import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('requiredMax1GrouperAnswer', {
  ...required,
  message: 'Se requiere 1 respuesta agrupadora máximo por pregunta'
})

extend('requiredReasonByCardMemoryQuestion', {
  ...required,
  message: 'Se requiere al menos 1 explicación en Texto o Imagen'
})
