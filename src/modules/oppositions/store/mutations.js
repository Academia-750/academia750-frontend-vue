export default {
  SET_INFORMATION_META(state, payload) {
    state.informationMeta = payload
  },
  SET_ITEMS_DATATABLE (state, payload) {
    state.itemsDatatable = payload
  },
  SET_STATUS_LOADING_ITEMS (state, payload) {
    state.stateLoadingItems = payload
  }
}
