export default {
  watch: {
    optionsDatatable: {
      handler () {
        const urlParams = this.buildQueryParamsRequest()

        urlParams['filter[is-available]'] = 'yes'

        this.getSubtopics({
          topic_id: this.$route.params.id,
          config: {
            params: urlParams
          }
        }).then( (response) => {
          this.topicData = response.data.meta.topic
        } )
      },
      deep: true
    }
  }
}
