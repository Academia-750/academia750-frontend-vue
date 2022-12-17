import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('oppositionsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps
  }
}
