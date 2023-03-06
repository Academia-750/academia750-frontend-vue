export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getSubtopics({
        topic_id: this.$route.params.id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then( (response) => {
        this.topicData = response.data.meta.topic
        this.metaData = response.data.meta
      } )
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      //console.log('shfbsdbf')
      this.getSubtopics({
        topic_id: this.$route.params.id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then((response) => {
        this.topicData = response.data.meta.topic
        this.metaData = response.data.meta
      }).catch((error) => {
        console.error(error)
      })
    },
    deleteSubtopicConfirm (item) {
      this.currentItemsSelectedForDelete = item
      this.$refs['dialogConfirmDeleteAction'].showDialog = true
    }
  }
}
