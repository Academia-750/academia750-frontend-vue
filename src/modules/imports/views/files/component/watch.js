export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.getImportProcesses({
          config: {
            params: this.buildQueryParamsRequest()
          }
        })
      },
      deep: true
    }
  }
}
