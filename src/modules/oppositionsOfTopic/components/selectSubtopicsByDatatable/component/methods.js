export default {
  methods: {
    searchFieldExecuted ($event) {
      this.searchWord = $event

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
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {

      const urlParams = this.buildQueryParamsRequest()

      urlParams['filter[is-available]'] = 'yes'

      this.getSubtopics({
        topic_id: this.$route.params.id,
        config: {
          params: urlParams
        }
      }).then((response) => {
        this.topicData = response.data.meta.topic
      })
    }
  }
}
