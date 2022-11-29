export default {
  computed: {
    getNameCurrentTopic () {
      return `Crear subtema del Tema: "${this.topicData?.attributes?.name}"`
    }
  }
}
