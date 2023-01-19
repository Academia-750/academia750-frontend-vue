import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('questionsSubtopicService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps,
    getNameCurrentTopic() {
      return `Tema: "${this.topicData?.attributes?.name}"`
    },
    getNameCurrentSubtopic() {
      return `Preguntas del subtema: "${this.subtopicData?.attributes?.name}"`
    },
    getTotalQuestionsSubtopic() {
      return `Total de preguntas del subtema: "${this.metaData['total']}"`
    }
  }
}
