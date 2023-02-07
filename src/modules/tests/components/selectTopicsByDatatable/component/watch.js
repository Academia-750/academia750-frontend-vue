export default {
  watch: {
    optionsDatatable: {
      handler() {

        if (this.oppositionId && this.topicGroupId) {
          this.loadDataTopics()
        }
      },
      deep: true
    },
    topicsSelected (value) {
      this.$emit('TopicsSelectedBinding',value)
    },
    oppositionId() {
      if (this.oppositionId && this.topicGroupId) {
        this.loadDataTopics()
      }
    },
    topicGroupId() {
      if (this.oppositionId && this.topicGroupId) {
        this.loadDataTopics()
      }
    }
  }
}
