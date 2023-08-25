/**
 * This store can be implemented by specific table stores
 * in order to have the same interface for the common
 * component server-data-table
 */

export const initialOptions = {
  orderBy: 'updated_at',
  order: -1,
  limit: 10,
  offset: 0,
  content: ''
}

export default {
  state: {
    items: [],
    selected: [],
    totalItems: 0,
    tableOptions: initialOptions
  },
  getters: {
    vueTableOptions: (state) => ({
      content: state.tableOptions.content || '',
      sortBy: [state.tableOptions.orderBy],
      sortDesc: state.tableOptions.order === -1 ? [true] : [],
      limit: state.tableOptions.limit,
      page: state.tableOptions.offset / state.tableOptions.limit + 1
    })
  },

  mutations: {
    SET_ITEMS_DATA_TABLE(state, payload) {
      state.items = payload
    },
    SET_TABLE_OPTIONS(state, payload) {
      console.log('SET_TABLE_OPTIONS', payload)
      state.tableOptions = { ...state.tableOptions, ...payload }
    },
    SET_ITEMS_SELECTED(state, payload) {
      state.selected = payload
    },
    SET_TOTAL_ITEMS(state, payload) {
      state.totalItems = payload
    }
  },
  actions: {
    setTableItems: async ({ commit }, { results, total }) => {
      commit('SET_ITEMS_DATA_TABLE', results)
      commit('SET_TOTAL_ITEMS', total)
    },
    resetTableOptions({ commit }) {
      commit('SET_TABLE_OPTIONS', initialOptions)
      commit('SET_ITEMS_SELECTED', [])
    }
  }
}
