export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.loadDatatatable()
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      this.getTopics({
        params: this.buildQueryParamsRequest()
      })
    }
  }
}
