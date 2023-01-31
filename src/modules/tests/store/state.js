const state = () => ({
  itemsDatatable: [],
  ItemsQuestionsByCardsMemory: [],
  ItemsQuestionsByTests: [],
  questionsDataHistoryByTest: [],
  questionsDataResolved: [],
  stateLoadingItems: false,
  fetchTestModuleNumberQuestionsResolved: 0,
  fetchTestModuleTotalNumberQuestionsTest: 0,
  informationMeta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 10,
    total: 10
    /* Esta información es la que por defecto le daremos al datatable, en lo que asíncronamente cargan los datos, y después colocar la información de la paginación que trae el servidor */
  }
})

export default state
