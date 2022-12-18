import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('topicsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps
  }
}
