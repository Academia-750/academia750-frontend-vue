export default {
  set_errors(state, payload) {
    state.errors = payload
  },
  set_success(state, payload) {
    state.success = payload
  },
  reset_values(state) {
    state.errors = null
    state.success = false
  }
}