export default {
  namespaced: true,
  state: {
    itemsDatatable: [],
    stateLoadingItems: false,
    currentUserForUpdate: null,
    tabViewGroups: 'groups-account-enable',
    usersSelected: [],
    optionsDatatableUsers: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['created-at'],
      sortDesc: [true],
      groupBy: [],
      groupDesc: [],
      mustSort: false,
      multiSort: true
    },
    informationMeta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
      /* Esta información es la que por defecto le daremos al datatable, en lo que asíncronamente cargan los datos, y después colocar la información de la paginación que trae el servidor */
    },
    matchesResetOptionsDatatable: false
  },
  getters: {},
  mutations: {
    SET_INFORMATION_META(state, payload) {
      state.informationMeta = payload
    },
    SET_ITEMS_DATATABLE(state, payload) {
      state.itemsDatatable = payload
    },
    SET_STATUS_LOADING_ITEMS(state, payload) {
      state.stateLoadingItems = payload
    },
    SET_CURRENT_USER_FOR_UPDATE(state, payload) {
      state.currentUserForUpdate = payload
    },
    SET_TAB_VIEW_GROUPS(state, payload) {
      state.tabViewGroups = payload
    },
    SET_USERS_SELECTED_DATATABLE(state, payload) {
      state.usersSelected = payload
    },
    SET_OPTIONS_DATATABLE_USERS(state, payload) {
      state.optionsDatatableUsers = payload
    },
    SET_MATCHES_RESET_OPTIONS_DATATABLE(state, payload) {
      state.matchesResetOptionsDatatable = payload
    }
  },
  actions: {
    mapItemsDatatableFromApi: (itemsApi) => {
      return itemsApi.map((record) => {
        return {
          id: record.id,
          dni: record.attributes.dni,
          'first-name': record.attributes.first_name,
          'last-name': record.attributes.last_name,
          phone: record.attributes.phone,
          email: record.attributes.email,
          'created-at': record.attributes.created_at
        }
      })
    },

    mapMetaInformationPagination: (response) => {
      return {
        current_page: response.data.meta.current_page,
        from: response.data.meta.from,
        last_page: response.data.meta.last_page,
        per_page: response.data.meta.per_page,
        to: response.data.meta.to,
        total: response.data.meta.total
      }
    },
    getStudents: async ({ commit }, config) => {
      try {
        commit('SET_USERS_SELECTED_DATATABLE', [])
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

        const response = await GroupRepository.getAll(config)

        if (response) {
          //console.trace(response)

          commit(
            'SET_ITEMS_DATATABLE',
            mapItemsDatatableFromApi(response.data.data)
          )
          commit('SET_STATUS_LOADING_ITEMS', false)
          commit('SET_INFORMATION_META', mapMetaInformationPagination(response))
        }

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
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
        commit('SET_USERS_SELECTED_DATATABLE', [])
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

    deleteStudent: async (_, options) => {
      try {
        const response = await GroupRepository.delete(
          options.id,
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

        commit('SET_USERS_SELECTED_DATATABLE', [])

        return Promise.resolve(response)
      } catch (error) {
        commit('SET_USERS_SELECTED_DATATABLE', [])
        //console.log(error)

        return Promise.reject(error)
      }
    }
  }
}
