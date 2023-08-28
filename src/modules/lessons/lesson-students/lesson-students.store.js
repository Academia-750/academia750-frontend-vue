import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'lessonStudentStore',
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