export default {
  watch: {
    optionsDatatable: {
      handler() {
        this.getQuestions({
          subtopic_id: this.$route.params.subtopic_id,
          config: {
            params: this.buildQueryParamsRequest()
          }
        }).then((response) => {
          this.subtopicData = response.data.meta.subtopic
          this.metaData = response.data.meta
        })
      },
      deep: true
    }
  }
}
