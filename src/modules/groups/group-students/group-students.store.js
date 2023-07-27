import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'groupStudentStore',
  namespaced: true,
  state: {
    ...DataTableStore.state,
    tab: 'active',
    groupId: 0
  },
  getters: {
    ...DataTableStore.getters
  },

  mutations: {
    ...DataTableStore.mutations,
    SET_TAB(state, payload) {
      state.tab = payload
    },
    SET_GROUP(state, payload) {
      state.groupId = payload
    }
  },
  actions: {
    ...DataTableStore.actions,
    setGroupId({ commit, state, dispatch }, payload) {
      // If is the same nothing
      if (payload === state.groupId) {
        return
      }

      commit('SET_GROUP', payload)
      commit('SET_TAB', 'active')
      dispatch('resetTableOptions') // from DataTableStore
    }
  }
}
