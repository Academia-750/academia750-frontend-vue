export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.getTopics({
          params: this.buildQueryParamsRequest()
        })
      },
      deep: true
    },
    topicsSelected (value) {
      this.$emit('TopicsSelectedBinding',value)
    }
  }
}
