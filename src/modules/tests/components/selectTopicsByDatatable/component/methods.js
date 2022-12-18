export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getTopics({
        params: this.buildQueryParamsRequest()
      })
    }
  }
}
