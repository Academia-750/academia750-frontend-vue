import { mapState } from 'vuex'
import footerProps from '../data/footerProps'

export default {
  computed: {
    ...mapState('studentsService', [
      'itemsDatatable',
      'stateLoadingItems',
      'informationMeta',
      'usersSelected',
      'matchesResetOptionsDatatable'
    ]),
    ...footerProps,
    getTitleByStateAccount() {
      return 'Gestión de Grupos'
    },
    getSelectedItems: {
      get() {
        return this.usersSelected
      },
      set(value) {
        this.SET_USERS_SELECTED_DATATABLE(value)
      }
    }
  }
}
