export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.getImportRecords({
          import_process_id: this.$route.params.id,
          config: {
            params: this.buildQueryParamsRequest()
          }
        }).then((response) => {
          this.importProcessData = response.data.meta.import_process
        })
      },
      deep: true
    }
  }
}
