import QuestionsSubtopicRepository from '../repositories/QuestionsSubtopicRepository'

const mapItemsDatatableFromApi = (itemsApi) => {
  return itemsApi.map((record) => {
    return {
      id: record.id,
      'question-text': record.attributes['question-text'],
      'reason-text': record.attributes['reason-text'],
      'is-visible': record.attributes.is_visible,
      'created-at': record.attributes.created_at
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

const getQuestions = async ({ commit }, options) => {

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

    const response = await QuestionsSubtopicRepository.getAllQuestions(options.subtopic_id, options.config)

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

const createQuestion = async (_, options) => {
  try {

    const response = await QuestionsSubtopicRepository.create(options.subtopic_id, options.data, options.config)

    return Promise.resolve(response)
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const fetchQuestion = async (_, options) => {

  try {
    const response = await QuestionsSubtopicRepository.get(options.subtopic_id, options.question_id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const updateQuestion = async (_, options) => {
  try {
    const response = await QuestionsSubtopicRepository.update(options.subtopic_id, options.question_id, options.data, options.config)

    return Promise.resolve(response)
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const deleteQuestion = async (_, options) => {
  try {
    const response = await QuestionsSubtopicRepository.delete(options.subtopic_id, options.question_id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getQuestions,
  createQuestion,
  fetchQuestion,
  updateQuestion,
  deleteQuestion
}
