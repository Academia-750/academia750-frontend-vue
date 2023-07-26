import { mapState } from 'vuex'
import footerProps from '../data/footerProps'

export default {
  computed: {
    ...mapState('studentsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta', 'usersSelected', 'matchesResetOptionsDatatable', 'tabViewStudents']),
    ...footerProps,
    getTitleByStateAccount () {
      return `Gestión de Alumnos ${this.stateAccount === 'enable' ? 'activos' : 'inactivos'}`
    },
    isEnableUsersTab () {
      return this.tabViewStudents === 'students-account-enable'
    },
    getSelectedItems: {
      get () {
        return this.usersSelected
      },
      set (value)  {
        this.SET_USERS_SELECTED_DATATABLE(value)
      }
    }
  }
}
