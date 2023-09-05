import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'profilesStore',
  namespaced: true,
  state: {
    ...DataTableStore.state,
    editItem: false
  },
  getters: {
    ...DataTableStore.getters
  },

  mutations: {
    ...DataTableStore.mutations,
    SET_EDIT_ITEM(state, payload) {
      state.editItem = payload
    }
  },
  actions: {
    ...DataTableStore.actions
  }
}
