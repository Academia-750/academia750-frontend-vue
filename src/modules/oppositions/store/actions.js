import OppositionRepository from '../repositories/OppositionRepository'

const getOppositions = async ({ commit }, config) => {

  try {
    const response = await OppositionRepository.getAll(config)

    if (response) {
      console.trace(response)
      //commit('set_user', response.data.data)
    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)
    commit('set_user', null)

    return Promise.reject(error)
  }
}

export default {
  getOppositions
}
