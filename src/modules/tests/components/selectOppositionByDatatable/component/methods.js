export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getOppositions({
        params: this.buildQueryParamsRequest()
      })
    }
  }
}
