export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.getQuestions({
          topic_id: this.$route.params.id,
          config: {
            params: this.buildQueryParamsRequest()
          }
        }).then((response) => {
          this.topicData = response.data.meta.topic
          this.metaData = response.data.meta
        })
      },
      deep: true
    }
  }
}
