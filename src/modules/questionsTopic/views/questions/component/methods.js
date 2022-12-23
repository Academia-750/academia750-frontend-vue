export default {
  methods: {
    searchFieldExecuted($event) {
      this.searchWord = $event
      this.getQuestions({
        topic_id: this.$route.params.id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then((response) => {
        this.topicData = response.data.meta.topic
        this.metaData = response.data.meta
      })
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      this.getQuestions({
        topic_id: this.$route.params.id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then((response) => {
        this.topicData = response.data.meta.topic
        this.metaData = response.data.meta
      })
    },
    deleteQuestionConfirm(item) {
      this.currentItemsSelectedForDelete = item
      this.$refs['dialogConfirmDeleteAction'].showDialog = true
    }
  }
}
