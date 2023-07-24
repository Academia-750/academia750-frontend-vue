import GroupRepository from './repositories/GroupRepository'
const initialOptions = {
  orderBy: 'created_at',
  order: -1,
  limit: 10,
  offset: 0,
  content: ''
}

export default {
  namespaced: true,
  state: {
    itemsDatatable: [],
    stateLoadingItems: false,
    currentUserForUpdate: null,
    tabViewGroups: 'groups-account-enable',
    itemsSelected: [],
    totalItems: 0,
    editItem: false,
    tableOptions: initialOptions
  },
  getters: {
    vueTableOptions: (state) => ({
      sortBy: [state.tableOptions.orderBy],
      sortDesc: state.tableOptions.order === 1 ? [true] : [],
      limit: state.tableOptions.limit,
      page: state.tableOptions.offset / state.tableOptions.limit + 1
    })
  },

  mutations: {
    SET_ITEMS_DATATABLE(state, payload) {
      state.itemsDatatable = payload
    },
    SET_TABLE_OPTIONS(state, payload) {
      state.tableOptions = { ...state.tableOptions, ...payload }
    },
    SET_STATUS_LOADING_ITEMS(state, payload) {
      state.stateLoadingItems = payload
    },
    SET_CURRENT_USER_FOR_UPDATE(state, payload) {
      state.currentUserForUpdate = payload
    },
    SET_ITEMS_SELECTED(state, payload) {
      state.itemsSelected = payload
    },
    SET_TOTAL_ITEMS(state, payload) {
      state.totalItems = payload
    },
    SET_EDIT_ITEM(state, payload) {
      state.editItem = payload
    }
  },
  actions: {
    getGroups: async ({ commit, state }) => {
      commit('SET_STATUS_LOADING_ITEMS', true)
      const response = await GroupRepository.list(state.tableOptions)

      commit('SET_ITEMS_DATATABLE', response.results)
      commit('SET_TOTAL_ITEMS', response.total)
      commit('SET_STATUS_LOADING_ITEMS', false)
    },
    resetOptions({ commit }) {
      commit('SET_TABLE_OPTIONS', initialOptions)
      commit('SET_ITEMS_SELECTED', [])
    }
  }
}
