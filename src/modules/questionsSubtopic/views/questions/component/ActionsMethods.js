import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsSubtopicService', ['getQuestions', 'deleteQuestion']),
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
          subtopic_id: this.$route.params.subtopic_id,
          config: {
            params: this.buildQueryParamsRequest()
          }
        }).then((response) => {
          this.subtopicData = response.data.meta.subtopic
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
