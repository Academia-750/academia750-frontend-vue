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
    oppositionSelected (newValue) {
      /* //console.log({
        lastValue,
        newValue
      }) */
      this.$emit('ClearTopicsSelectedBinding')
      this.$emit('OppositionSelectedBinding',newValue)
    }
  }
}
