import { mapState } from 'vuex'
import footerProps from '../data/footerProps'

export default {
  computed: {
    ...mapState('studentsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps,
    getTitleByStateAccount () {
      return `Gestión de Alumnos ${this.stateAccount === 'enable' ? 'activos' : 'inactivos'}`
    }
  }
}
