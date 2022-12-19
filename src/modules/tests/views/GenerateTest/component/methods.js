export default {
  methods: {
    removeTopicSelected(topic_id) {
      this.topicsSelected = this.topicsSelected.filter((topic) => topic.id !== topic_id)

      this.$refs['selectTopicsByDatatable'].topicsSelected = this.topicsSelected
    }
  }
}
