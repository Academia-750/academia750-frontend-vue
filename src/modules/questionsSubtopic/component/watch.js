export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.getTopics({
          params: this.buildQueryParamsRequest()
        })
      },
      deep: true
    }
  }
}
