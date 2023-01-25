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

const claimQuestion = async (_, options) => {
  try {

    const response = await TestsRepository.claimQuestion(options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const resolveQuestion = async (_, options) => {
  try {

    const response = await TestsRepository.resolveQuestion(options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const closeAndGradeTest = async (_, options) => {
  try {

    const response = await TestsRepository.closeAndGradeTest(options.test_id, options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const sortQuestionsByIndexTest = (questions_data, questions) => {
  return questions_data.map((question_reference) => {
    return questions.find((question) => question.id === question_reference.question_id)
  })
}

const fetchAQuiz = async ({ commit }, options) => {
  try {

    commit('SET_ITEMS_QUESTIONS_BY_TESTS', [])
    commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', [])
    const response = await TestsRepository.fetchUnresolvedTest(options.test_id, options.config)

    const { data: questions } = response.data
    const { questions_data } = response.data.meta

    //commit('SET_ITEMS_QUESTIONS_BY_TESTS', sortQuestionsByIndexTest(questions_data, questions))
    commit('SET_ITEMS_QUESTIONS_BY_TESTS', response.data.data)
    commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', response.data.meta.questions_data)

    return Promise.resolve(response)

  } catch (error) {
    commit('SET_ITEMS_QUESTIONS_BY_TESTS', [])
    commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', [])
    console.log(error)

    return Promise.reject(error)
  }
}

const fetchHistoryTestComplete = async ({ commit }, options) => {
  try {

    commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', [])
    const response = await TestsRepository.fetchHistoryTestComplete(options.test_id, options.config)

    const { data: questions } = response.data
    const { questions_data } = response.data.meta

    commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', sortQuestionsByIndexTest(questions_data, questions))
    //commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', response.data.data)

    return Promise.resolve(response)

  } catch (error) {
    commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', [])
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
  getCardsMemory,
  claimQuestion,
  resolveQuestion,
  closeAndGradeTest,
  fetchHistoryTestComplete
}
