export default {
  methods: {
    searchFieldExecuted($event) {
      this.searchWord = $event
      this.getImportProcesses({
        config: {
          params: this.buildQueryParamsRequest()
        }
      })
    }
  }
}
