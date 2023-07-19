export default {
  SET_INFORMATION_META(state, payload) {
    state.informationMeta = payload
  },
  SET_ITEMS_DATATABLE(state, payload) {
    state.itemsDatatable = payload
  },
  SET_STATUS_LOADING_ITEMS(state, payload) {
    state.stateLoadingItems = payload
  },
  SET_CURRENT_USER_FOR_UPDATE(state, payload) {
    state.currentUserForUpdate = payload
  },
  SET_TAB_VIEW_GROUPS(state, payload) {
    state.tabViewGroups = payload
  },
  SET_USERS_SELECTED_DATATABLE(state, payload) {
    state.usersSelected = payload
  },
  SET_OPTIONS_DATATABLE_USERS(state, payload) {
    state.optionsDatatableUsers = payload
  },
  SET_MATCHES_RESET_OPTIONS_DATATABLE(state, payload) {
    state.matchesResetOptionsDatatable = payload
  }
}
