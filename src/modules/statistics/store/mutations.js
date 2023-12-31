export default {
  SET_INFORMATION_META(state, payload) {
    state.informationMeta = payload
  },
  SET_ITEMS_DATATABLE (state, payload) {
    state.itemsDatatable = payload
  },
  SET_STATUS_LOADING_ITEMS (state, payload) {
    state.stateLoadingItems = payload
  },
  SET_INFORMATION_META_QUESTIONS_WRONG(state, payload) {
    state.informationMetaQuestionsWrong = payload
  },
  SET_ITEMS_DATATABLE_QUESTIONS_WRONG (state, payload) {
    state.itemsDatatableQuestionsWrong = payload
  },
  SET_STATUS_LOADING_ITEMS_QUESTIONS_WRONG (state, payload) {
    state.stateLoadingItemsQuestionsWrong = payload
  },
  SET_INFORMATION_META_TESTS_BY_PERIOD(state, payload) {
    state.informationMetaTestsByPeriod = payload
  },
  SET_ITEMS_DATATABLE_TESTS_BY_PERIOD (state, payload) {
    state.itemsDatatableTestsByPeriod = payload
  },
  SET_STATUS_LOADING_ITEMS_TESTS_BY_PERIOD (state, payload) {
    state.stateLoadingItemsTestsByPeriod = payload
  }
}
