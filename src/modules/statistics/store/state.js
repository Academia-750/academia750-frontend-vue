const state = () => ({
  itemsDatatable: [],
  stateLoadingItems: false,
  informationMeta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 10,
    total: 10
  },
  informationMetaQuestionsWrong: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 10,
    total: 10
  },
  itemsDatatableQuestionsWrong: [],
  stateLoadingItemsQuestionsWrong: false
})

export default state
