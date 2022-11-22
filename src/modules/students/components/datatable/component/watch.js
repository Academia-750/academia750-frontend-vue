export default {
  watch: {
    optionsDatatable: {
      handler () {
        this.getStudents({
          params: this.getParamsUrlApi()
        })
      },
      deep: true
    }
  }
}
