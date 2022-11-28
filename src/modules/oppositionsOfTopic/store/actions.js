import OppositionsOfTopicRepository from '../repositories/OppositionsOfTopicRepository'

const mapItemsDatatableFromApi = (itemsApi) => {
  return itemsApi.map((record) => {
    return {
      id: record.id,
      name: record.attributes.name,
      period: record.attributes.period,
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

const getOppositions = async ({ commit }, options) => {

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

    const response = await OppositionsOfTopicRepository.getAllOppositions(options.topic_id, options.config)

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

const createOpposition = async (_, options) => {
  try {

    const response = await OppositionsOfTopicRepository.create(options.data)

    return Promise.resolve(response)
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const fetchOpposition = async (_, options) => {

  try {
    const response = await OppositionsOfTopicRepository.get(options.id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const updateOpposition = async (_, options) => {
  try {
    const response = await OppositionsOfTopicRepository.update(options.id, options.data, options.config)

    return Promise.resolve(response)
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const deleteOpposition = async (_, options) => {
  try {
    const response = await OppositionsOfTopicRepository.delete(options.id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getOppositions,
  createOpposition,
  fetchOpposition,
  updateOpposition,
  deleteOpposition
}
