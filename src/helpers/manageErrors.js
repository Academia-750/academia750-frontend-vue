import store from '@/store'

export const desactivateError = () => {
  store.state.errorsService.responseError = null
}

export const activateError = (errorConfig = null) => {
  const error = errorConfig ?? {
    status: 500,
    message: 'Error del servidor'
  }

  store.state.errorsService.responseError = error

  return error
}

export default {
  activateError,
  desactivateError
}
