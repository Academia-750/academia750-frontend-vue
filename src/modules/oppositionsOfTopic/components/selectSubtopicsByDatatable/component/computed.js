import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('subtopicsOfTopicService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps,
    getNameCurrentTopic () {
      return `Agregar oposición al Tema: "${this.topicData?.attributes?.name}"`
    }
  }
}
