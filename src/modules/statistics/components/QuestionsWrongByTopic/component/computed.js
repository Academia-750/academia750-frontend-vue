import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('statisticsService', ['itemsDatatableQuestionsWrong', 'stateLoadingItemsQuestionsWrong', 'informationMetaQuestionsWrong']),
    ...footerProps
  }
}
