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
      this.getTestsByPeriodApi({
        period_key: this.period_key,
        config: {
          params: this.buildQueryParamsRequest()
        }
      })
    }
  }
}
