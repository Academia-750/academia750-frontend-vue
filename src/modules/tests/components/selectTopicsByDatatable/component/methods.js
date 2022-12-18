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

      this.getTopics({
        params: urlParams
      })
    }
  }
}
