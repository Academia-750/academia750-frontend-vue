export default {
  watch: {
    optionsDatatable: {
      handler () {
        this.getOppositions({
          topic_id: this.$route.params.id,
          config: {
            params: this.buildQueryParamsRequest()
          }
        }).then( (response) => {
          this.topicData = response.data.meta.topic
        } )
      },
      deep: true
    }
  }
}
