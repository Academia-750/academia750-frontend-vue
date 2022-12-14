import { mapState } from 'vuex'
import footerProps from './footerProps'

export default {
  computed: {
    ...mapState('questionsTopicService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps,
    getNameCurrentTopic() {
      return `Preguntas del Tema: "${this.topicData?.attributes?.name}"`
    },
    getTotalQuestionsSyllabus() {
      return `Total de preguntas de tema: "${this.metaData['total-questions-syllabus']}"`
    }
  }
}
