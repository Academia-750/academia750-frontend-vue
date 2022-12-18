export default {
  watch: {
    optionsDatatable: {
      handler() {
        const urlParams = this.buildQueryParamsRequest()

        urlParams['filter[oppositions]'] = this.oppositionId
        urlParams['filter[topic-group]'] = this.topicGroupId

        this.getTopics({
          params: urlParams
        })
      },
      deep: true
    },
    topicsSelected (value) {
      this.$emit('TopicsSelectedBinding',value)
    },
    topicGroupId(value) {
      const urlParams = this.buildQueryParamsRequest()

      urlParams['filter[oppositions]'] = this.oppositionId
      urlParams['filter[topic-group]'] = value

      this.getTopics({
        params: urlParams
      })
    }
  }
}
