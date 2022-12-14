import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsTopicService', ['getQuestions', 'deleteQuestion']),
    async deleteQuestionAction() {
      if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
        return
      }

      try {
        await this.deleteQuestion({
          topic_id: this.$route.params.id,
          subtopic_id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El subtema ha sido eliminado con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        await this.getQuestions({
          topic_id: this.$route.params.id,
          config: {
            params: this.buildQueryParamsRequest()
          }
        }).then((response) => {
          this.topicData = response.data.meta.topic
          this.metaData = response.data.meta
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
