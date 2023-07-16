export default {
  watch: {
    optionsDatatable: {
      handler () {
        this.getStudents({
          params: this.getParamsUrlApi()
        })
      },
      deep: true
    },
    matchesResetOptionsDatatable: {
      handler () {
        ////console.log(this.matchesResetOptionsDatatable)
        this.searchWord = ''
        if (this.matchesResetOptionsDatatable) {
          this.optionsDatatable = {
            page: 1,
            itemsPerPage: 10,
            sortBy: ['created-at'],
            sortDesc: [true],
            groupBy: [],
            groupDesc: [],
            mustSort: false,
            multiSort: true
          }

          this.SET_MATCHES_RESET_OPTIONS_DATATABLE(false)
        }
      },
      deep: true
    }
  }
}
