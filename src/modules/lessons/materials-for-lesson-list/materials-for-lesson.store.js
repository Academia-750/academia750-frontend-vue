import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'materialsForLessonStore',
  namespaced: true,
  state: {
    ...DataTableStore.state,
    currentUserForUpdate: null,
    editItem: false,
    type: '',
    tags: [],
    uploadFile: {},
    workspace: null
  },
  getters: {
    ...DataTableStore.getters
  },

  mutations: {
    ...DataTableStore.mutations,
    SET_EDIT_ITEM(state, payload) {
      state.editItem = payload
    },

    SET_TYPE(state, payload) {
      state.type = payload
    },
    SET_TAGS(state, payload) {
      state.tags = payload
    }
  },
  actions: {
    ...DataTableStore.actions,
    resetTableOptions({ commit }) {
      DataTableStore.actions.resetTableOptions({ commit })
      commit('SET_TYPE', '')
      commit('SET_TAGS', [])
    }
  }
}
