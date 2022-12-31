import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('statisticsService', ['itemsDatatableTestsByPeriod', 'stateLoadingItemsTestsByPeriod', 'informationMetaTestsByPeriod']),
    ...footerProps,
    getNameCurrentTopic () {
      return 'Selecciona Tests'
    }
  }
}
