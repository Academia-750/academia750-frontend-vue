export default {
  computed: {
    getNameCurrentTopic() {
      return `Preguntas del Tema: "${this.topicData?.attributes?.name}"`
    },
    getClassAnswersField() {
      return {
        'd-flex': true,
        'justify-center': true,
        'flex-column': this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.md,
        'flex-row': this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl
      }
    },
    getLabelByQuestionBinary () {
      return this.isQuestionBinary ? 'Si' : 'No'
    },
    invalidComputedValidation () {
      return !(this.isCardMemoryQuestion || this.isTestQuestion)
    }
  }
}
