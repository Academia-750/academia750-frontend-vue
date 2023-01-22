import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsSubtopicService', ['fetchQuestion']),
    async fetchDataQuestionForUpdate() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonUpdateQuestion = true

        const response = await this.fetchQuestion({
          subtopic_id: this.$route.params.subtopic_id,
          question_id: this.$route.params.question_id,
          config: {
            params: {
              include: 'image,answers'
            }
          }
        })

        this.syncValuesForm(response)

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateQuestion = false

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateQuestion = false
      }
    }
  }
}
