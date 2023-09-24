import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'studentsMaterialsStore',
  namespaced: true,
  state: {
    ...DataTableStore.state,
    currentUserForUpdate: null,
    tags: [],
    lessons: []
  },
  getters: {
    ...DataTableStore.getters
  },

  mutations: {
    ...DataTableStore.mutations,
    SET_TAGS(state, payload) {
      state.tags = payload
    },
    SET_LESSONS(state, payload) {
      state.lessons = payload
    }
  },
  actions: {
    ...DataTableStore.actions,
    resetTableOptions({ commit }) {
      DataTableStore.actions.resetTableOptions({ commit })
      commit('SET_TAGS', [])
      commit('SET_LESSONS', [])
    }
  }
}
