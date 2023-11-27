import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'lessonAttendeesStore',
  namespaced: true,
  state: {
    ...DataTableStore.state,
    willJoin: false,
    total: 0,
    willAssist: 0
  },
  getters: {
    ...DataTableStore.getters
  },
  mutations: {
    ...DataTableStore.mutations,
    SET_WILL_JOIN(state, payload) {
      state.willJoin = payload
    },
    SET_TOTAL(state, payload) {
      state.total = payload
    },
    SET_WILL_ASSIST(state, payload) {
      state.willAssist = payload
    }
  },
  actions: {
    ...DataTableStore.actions,
    resetTableOptions({ commit }) {
      DataTableStore.actions.resetTableOptions({ commit })
      commit('SET_WILL_JOIN', undefined)
      commit('SET_TOTAL', 0)
      commit('SET_WILL_ASSIST', 0)
    }
  }
}
