export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.loadDataTopics()
      },
      deep: true
    },
    topicsSelected (value) {
      this.$emit('TopicsSelectedBinding',value)
    },
    topicGroupId() {
      this.loadDataTopics()
    }
  }
}
