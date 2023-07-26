import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'groupStudentStore',
  namespaced: true,
  state: {
    ...DataTableStore.state,
    tab: 'active'
  },
  getters: {
    ...DataTableStore.getters
  },

  mutations: {
    ...DataTableStore.mutations,
    SET_TAB(state, payload) {
      state.tab = payload
    }
  },
  actions: {
    ...DataTableStore.actions
  }
}
