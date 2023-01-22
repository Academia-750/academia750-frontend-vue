import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsTopicService', ['fetchQuestion']),
    async fetchDataQuestionForUpdate() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonUpdateQuestion = true

        const response = await this.fetchQuestion({
          topic_id: this.$route.params.id,
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
