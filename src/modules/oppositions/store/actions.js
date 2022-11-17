import OppositionRepository from '../repositories/OppositionRepository'

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

const getOppositions = async ({ commit }, config) => {

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

    const response = await OppositionRepository.getAll(config)

    if (response) {
      console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApi(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)

    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getOppositions
}
