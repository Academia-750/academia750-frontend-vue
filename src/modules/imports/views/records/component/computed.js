import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('importsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps
  }
}
