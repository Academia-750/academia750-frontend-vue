export default {
  watch: {
    optionsDatatable: {
      handler () {
        this.loadDatatatable()
      },
      deep: true
    }
  }
}
