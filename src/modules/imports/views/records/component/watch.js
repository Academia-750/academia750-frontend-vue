export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.getImportRecords({
          import_process_id: this.$route.params.id,
          config: {
            params: this.buildQueryParamsRequest()
          }
        })
      },
      deep: true
    }
  }
}
