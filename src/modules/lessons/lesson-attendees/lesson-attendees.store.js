import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'lessonAttendeesStore',
  namespaced: true,
  state: {
    ...DataTableStore.state
  },
  getters: {
    ...DataTableStore.getters
  },

  mutations: {
    ...DataTableStore.mutations
  },
  actions: {
    ...DataTableStore.actions
  }
}