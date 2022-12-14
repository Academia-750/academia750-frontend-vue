export default {
  computed: {
    getNameCurrentSubtopic() {
      return `Pregunta del Subtema: "${this.subtopicData?.attributes?.name}"`
    },
    getNameCurrentQuestion() {
      return `Pregunta: "${this.questionData?.data?.attributes['question-text']}"`
    },
    getClassAnswersField() {
      return {
        'd-flex': true,
        'justify-center': true,
        'flex-column': this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.md,
        'flex-row': this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl
      }
    }
  }
}
