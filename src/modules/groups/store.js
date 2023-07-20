import GroupRepository from './repositories/GroupRepository'
export default {
  namespaced: true,
  state: {
    itemsDatatable: [],
    stateLoadingItems: false,
    currentUserForUpdate: null,
    tabViewGroups: 'groups-account-enable',
    itemsSelected: [],
    totalItems: 0,
    editItem: false
  },

  mutations: {
    SET_ITEMS_DATATABLE(state, payload) {
      state.itemsDatatable = payload
    },
    SET_STATUS_LOADING_ITEMS(state, payload) {
      state.stateLoadingItems = payload
    },
    SET_CURRENT_USER_FOR_UPDATE(state, payload) {
      state.currentUserForUpdate = payload
    },
    SET_ITEMS_SELECTED(state, payload) {
      state.editItem = payload
    },
    SET_TOTAL_ITEMS(state, payload) {
      state.totalItems = payload
    },
    SET_EDIT_ITEM(state, payload) {
      state.editItem = payload
    }
  },
  actions: {
    getGroups: async ({ commit }, config) => {
      commit('SET_ITEMS_SELECTED', [])
      commit('SET_STATUS_LOADING_ITEMS', true)
      commit('SET_ITEMS_DATATABLE', [])

      const response = await GroupRepository.list(config)

      commit('SET_ITEMS_DATATABLE', response.results)
      commit('SET_TOTAL_ITEMS', response.total)
      commit('SET_STATUS_LOADING_ITEMS', false)
    },
    createStudent: async (_, options) => {
      try {
        const response = await GroupRepository.create(options.data)

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },
    fetchStudent: async ({ commit }, options) => {
      try {
        commit('SET_ITEMS_SELECTED', [])
        const response = await GroupRepository.get(options.id, options.config)

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },

    updateStudent: async (_, options) => {
      try {
        const response = await GroupRepository.update(
          options.id,
          options.data,
          options.config
        )

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },

    fetchStudentGroups: async (_, options) => {
      try {
        const response = await GroupRepository.fetchStudentsGroups(
          options.config
        )

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },
    fetchRoleStudentData: async (_, options) => {
      try {
        const response = await GroupRepository.fetchRoleStudentData(
          options.config
        )

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },
    actionsForMultipleRecords: async ({ commit }, options) => {
      try {
        const response = await GroupRepository.actionMassiveSelection(
          options.data,
          options.config
        )

        commit('SET_ITEMS_SELECTED', [])

        return Promise.resolve(response)
      } catch (error) {
        commit('SET_ITEMS_SELECTED', [])
        //console.log(error)

        return Promise.reject(error)
      }
    }
  }
}
