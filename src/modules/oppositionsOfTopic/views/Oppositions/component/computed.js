import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('oppositionsOfTopicService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps,
    getNameCurrentTopic () {
      return `Oposiciones del Tema: "${this.topicData?.attributes?.name}"`
    }
  }
}
