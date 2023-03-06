import SubtopicRepository from '../repositories/SubtopicRepository'

const mapItemsDatatableFromApi = (itemsApi) => {
  return itemsApi.map((record) => {
    return {
      id: record.id,
      name: record.attributes.name,
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

const getSubtopics = async ({ commit }, config) => {

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

    const response = await SubtopicRepository.getAll(config)

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

const createSubtopic = async (_, options) => {
  try {

    const response = await SubtopicRepository.create(options.data)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const fetchSubtopic = async (_, options) => {

  try {
    const response = await SubtopicRepository.get(options.id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const updateSubtopic = async (_, options) => {
  try {
    const response = await SubtopicRepository.update(options.id, options.data, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const deleteSubtopic = async (_, options) => {
  try {
    const response = await SubtopicRepository.delete(options.id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const importSubtopicsCSV = async (_, options) => {
  try {

    const response = await SubtopicRepository.import(options.data, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const downloadTemplateImport = async (_, options) => {
  try {

    const response = await SubtopicRepository.downloadTemplateImport(options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getSubtopics,
  createSubtopic,
  fetchSubtopic,
  updateSubtopic,
  deleteSubtopic,
  importSubtopicsCSV,
  downloadTemplateImport
}
