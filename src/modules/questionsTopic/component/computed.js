export default {
  computed: {
    ...mapState('topicsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps,
    getNameCurrentTopic() {
      return `Crear subtema del Tema: "${this.topicData?.attributes?.name}"`
    }
  }
}
