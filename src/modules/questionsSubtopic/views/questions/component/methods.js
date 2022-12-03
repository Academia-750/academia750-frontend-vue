export default {
  methods: {
    searchFieldExecuted($event) {
      this.searchWord = $event
      this.getQuestions({
        subtopic_id: this.$route.params.subtopic_id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then((response) => {
        this.subtopicData = response.data.meta.subtopic
      })
    },
    deleteQuestionConfirm(item) {
      this.currentItemsSelectedForDelete = item
      this.$refs['dialogConfirmDeleteAction'].showDialog = true
    }
  }
}
