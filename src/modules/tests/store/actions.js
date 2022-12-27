import TestsRepository from '../repositories/TestsRepository'

const mapItemsDatatableFromApi = (itemsApi) => {
  return itemsApi.map((record) => {
    return {
      id: record.id,
      'created-at': record.attributes.created_at,
      'test-questions-count': record.attributes.number_of_questions_generated
    }
  })
}

const mapMetaInformationPagination = (response) => {
  return {
    current_page: response.data.meta.current_page,
    from: response.data.meta.from,
    last_page: response.data.meta.last_page,
    per_page: response.data.meta.per_page,
    to: response.data.meta.to,
    total: response.data.meta.total
  }
}

const createAQuiz = async (_, options) => {
  try {

    const response = await TestsRepository.generateTestWithQuestions(options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const fetchAQuiz = async (_, options) => {
  try {

    const response = await TestsRepository.fetchUnresolvedTest(options.test_id, options.config)

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const fetchACardMemory = async ({ commit }, options) => {
  try {

    commit('SET_ITEMS_QUESTIONS_BY_CARDS_MEMORY', [])
    const response = await TestsRepository.fetchCardMemory(options.test_id, options.config)

    commit('SET_ITEMS_QUESTIONS_BY_CARDS_MEMORY', response.data.data)

    return Promise.resolve(response)

  } catch (error) {

    commit('SET_ITEMS_QUESTIONS_BY_CARDS_MEMORY', [])
    console.log(error)

    return Promise.reject(error)
  }
}

const getUnresolvedTests = async ({ commit }, config) => {

  try {

    commit('SET_INFORMATION_META', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS', true)

    commit('SET_ITEMS_DATATABLE', [])

    const response = await TestsRepository.getUnresolvedTests(config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApi(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const getCardsMemory = async ({ commit }, config) => {

  try {

    commit('SET_INFORMATION_META', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS', true)

    commit('SET_ITEMS_DATATABLE', [])

    const response = await TestsRepository.getCardsMemory(config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApi(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

export default {
  createAQuiz,
  fetchAQuiz,
  fetchACardMemory,
  getUnresolvedTests,
  getCardsMemory
}
