export default {
  computed: {
    getNameCurrentTopic () {
      return `Actualizar subtema del Tema: "${this.topicData?.attributes?.name}"`
    }
  }
}
