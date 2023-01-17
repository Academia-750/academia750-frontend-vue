import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('subtopicsOfTopicService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps,
    getNameCurrentTopic () {
      return `Subtemas del Tema: "${this.topicData?.attributes?.name}"`
    },
    getTotalQuestionsSubtopics() {
      return `Total de preguntas de los subtemas: "${this.metaData['total-questions-subtopics']}"`
    }
  }
}
