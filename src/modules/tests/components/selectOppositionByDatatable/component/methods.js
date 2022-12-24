export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getOppositions({
        params: this.buildQueryParamsRequest()
      })
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      this.getOppositions({
        params: this.buildQueryParamsRequest()
      })
    }
  }
}
