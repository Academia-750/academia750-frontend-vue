export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getSubtopics({
        topic_id: this.$route.params.id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      })
    },
    deleteSubtopicConfirm (item) {
      this.currentItemsSelectedForDelete = item
      this.$refs['dialogConfirmDeleteAction'].showDialog = true
    }
  }
}
