export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getOppositionsAvailableByTopic({
        topic_id: this.$route.params.id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then( (response) => {
        this.topicData = response.data.meta.topic
      } )
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      this.getOppositionsAvailableByTopic({
        topic_id: this.$route.params.id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then((response) => {
        this.topicData = response.data.meta.topic
      })
    }
  }
}
