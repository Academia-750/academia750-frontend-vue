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
  SET_ITEMS_QUESTIONS_BY_CARDS_MEMORY(state, payload) {
    state.ItemsQuestionsByCardsMemory = payload
  },
  SET_ITEMS_QUESTIONS_BY_TESTS(state, payload) {
    state.ItemsQuestionsByTests = payload
  },
  SET_QUESTIONS_DATA_HISTORY_BY_TEST(state, payload) {
    state.questionsDataHistoryByTest = payload
  },
  SET_QUESTIONS_DATA_RESOLVED(state, payload) {
    state.questionsDataResolved = payload
  },
  SET_NUMBER_QUESTIONS_RESOLVED(state, payload) {
    state.fetchTestModuleNumberQuestionsResolved = payload
  },
  SET_TOTAL_NUMBER_QUESTIONS_TEST(state, payload) {
    state.fetchTestModuleTotalNumberQuestionsTest = payload
  }
}
