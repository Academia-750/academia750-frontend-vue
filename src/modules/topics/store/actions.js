import TopicRepository from '../repositories/TopicRepository'

const mapItemsDatatableFromApi = (itemsApi) => {

  return itemsApi.map((record) => {

    const { has_subtopics, count_subtopics_this_topic } = record.meta
    const { topic_group } = record.relationships

    return {
      id: record.id,
      name: record.attributes.name,
      has_subtopics: has_subtopics,
      is_available: record.attributes.is_available,
      'total-count-subtopics': count_subtopics_this_topic,
      topic_group: topic_group.attributes.name,
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

const getTopicsGroups = async (_ , config) => {
  try {

    const response = await TopicRepository.getTopicsGroups(config)

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const getTopics = async ({ commit }, config) => {

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

    const response = await TopicRepository.getAll(config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApi(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const fetchTopicsAvailableInTestsOfStudent = async ({ commit }, config) => {

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

    const response = await TopicRepository.fetchTopicsAvailableInTestsOfStudent(config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApi(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const getTopicsAvailableForGenerateTest = async ({ commit }, options) => {

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

    const response = await TopicRepository.getTopicsAvailableForGenerateTest(options.data, options.config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApi(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const createTopic = async (_, options) => {
  try {

    const response = await TopicRepository.create(options.data)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const fetchTopic = async (_, options) => {

  try {
    const response = await TopicRepository.get(options.id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const updateTopic = async (_, options) => {
  try {
    const response = await TopicRepository.update(options.id, options.data, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const deleteTopic = async (_, options) => {
  try {
    const response = await TopicRepository.delete(options.id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const fetchTopicGroups = async (_, options) => {
  try {
    const response = await TopicRepository.fetchTopicsGroups(options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const importTopicsCSV = async (_, options) => {
  try {

    const response = await TopicRepository.import(options.data, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const downloadTemplateImport = async (_, options) => {
  try {

    const response = await TopicRepository.downloadTemplateImport(options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getTopics,
  getTopicsAvailableForGenerateTest,
  createTopic,
  fetchTopic,
  updateTopic,
  deleteTopic,
  fetchTopicGroups,
  importTopicsCSV,
  getTopicsGroups,
  downloadTemplateImport,
  fetchTopicsAvailableInTestsOfStudent
}
