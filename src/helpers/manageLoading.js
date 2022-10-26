import store from '@/store'

export const enableLoadingProgressCircular = () => {
  store.state.loadingService.displayProgressCircularLoading = true
}

export const disabledLoadingProgressCircular = () => {
  store.state.loadingService.displayProgressCircularLoading = false
}

export const enableLoadingProgressLinear = () => {
  store.state.loadingService.displayProgressLinearLoading = true
}

export const disabledLoadingProgressLinear = () => {
  store.state.loadingService.displayProgressLinearLoading = false
}

export default {
  enableLoadingProgressCircular,
  disabledLoadingProgressCircular,
  enableLoadingProgressLinear,
  disabledLoadingProgressLinear
}
