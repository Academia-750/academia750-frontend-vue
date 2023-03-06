export default {
  methods: {
    searchFieldExecuted($event) {
      this.searchWord = $event
      this.getImportRecords({
        import_process_id: this.$route.params.id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then((response) => {
        this.importProcessData = response.data.meta.import_process
      })
    },
    getFieldsRowsValuesErrorRecord ($arrayKeys, $arrayErrors) {
      ////console.log($arrayErrors)

      return $arrayKeys.map( (column) => {
        //console.log($arrayErrors[column])

        return {
          'name-row': column,
          'description-errors': $arrayErrors[column]
        }
      })
    }
  }
}
