import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'workspaceMaterialStore',
  namespaced: true,
  state: {
    ...DataTableStore.state,
    currentUserForUpdate: null,
    editItem: false,
    workspace: '',
    type: '',
    tags: [],
    uploadFile: {}
  },
  getters: {
    ...DataTableStore.getters
  },

  mutations: {
    ...DataTableStore.mutations,
    SET_EDIT_ITEM(state, payload) {
      state.editItem = payload
    },
    SET_WORKSPACE(state, payload) {
      state.workspace = payload
    },
    SET_TYPE(state, payload) {
      state.type = payload
    },
    SET_TAGS(state, payload) {
      state.tags = payload
    },
    SET_UPLOAD_FILE(state, payload) {
      state.uploadFile = payload
    }
  },
  actions: {
    ...DataTableStore.actions,
    resetTableOptions({ commit }) {
      DataTableStore.actions.resetTableOptions({ commit })
      commit('SET_TYPE', '')
      commit('SET_TAGS', [])
      commit('SET_WORKSPACE', '')
      commit('SET_UPLOAD_FILE', {})
    }
  }
}
