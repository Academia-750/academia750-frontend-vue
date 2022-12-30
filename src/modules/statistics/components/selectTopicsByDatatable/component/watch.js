export default {
  watch: {
    optionsDatatable: {
      handler () {
        this.loadDatatatable()
      },
      deep: true
    },
    topicsSelected: {
      handler () {
        this.$emit('emitChangeSelectedTopics', this.topicsSelected)
      },
      deep: true
    }
  }
}
