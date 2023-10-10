import DataTableStore from '@/modules/resources/store/data-table.store'

export default {
  name: 'permissionsStore',
  namespaced: true,
  state: {
    ...DataTableStore.state,
    // This is order by name by default
    tableOptions: {
      ...DataTableStore.state.tableOptions,
      orderBy: 'alias_name',
      order: 1
    }
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
