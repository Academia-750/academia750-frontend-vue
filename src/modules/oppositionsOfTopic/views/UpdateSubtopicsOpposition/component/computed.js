export default {
  computed: {
    getNameCurrentTopic () {
      return `Agregar oposición al Tema: "${this.topicData?.attributes?.name}"`
    }
  }
}
