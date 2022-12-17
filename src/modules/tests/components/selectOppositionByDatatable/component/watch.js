export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.getOppositions({
          params: this.buildQueryParamsRequest()
        })
      },
      deep: true
    },
    oppositionSelected (value) {
      this.$emit('OppositionSelectedBinding',value)
    }
  }
}
