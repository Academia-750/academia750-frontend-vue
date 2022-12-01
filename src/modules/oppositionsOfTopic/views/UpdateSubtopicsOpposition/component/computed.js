export default {
  computed: {
    getNameCurrentTopic () {
      return `Actualizar oposición al Tema: "${this.topicData?.attributes?.name}"`
    },
    getNameCurrentOpposition () {
      return `Actualizar subtemas de la oposición: "${this.oppositionData.attributes.name} - ${this.oppositionData.attributes.period}"`
    }
  }
}
