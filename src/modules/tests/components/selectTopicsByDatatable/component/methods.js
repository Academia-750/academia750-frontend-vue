export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.loadDataTopics()
    },
    loadDataTopics() {
      const urlParams = this.buildQueryParamsRequest()

      urlParams['filter[oppositions]'] = this.oppositionId
      urlParams['filter[topic-group]'] = this.topicGroupId
      //urlParams['filter[has-questions-available]'] = '0'

      this.getTopics({
        params: urlParams
      })
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      this.loadDataTopics()
    }
  }
}
