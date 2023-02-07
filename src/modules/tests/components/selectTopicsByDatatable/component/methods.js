import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('topicsService', ['SET_ITEMS_DATATABLE']),
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.loadDataTopics()
    },
    loadDataTopics() {
      const urlParams = this.buildQueryParamsRequest()

      urlParams['opposition-id'] = this.oppositionId
      urlParams['topic-group-id'] = this.topicGroupId
      //urlParams['filter[oppositions]'] = this.oppositionId
      //urlParams['filter[topic-group]'] = this.topicGroupId
      //urlParams['filter[has-questions-available]'] = '0'

      this.getTopicsAvailableForGenerateTest({
        config: {
          params: urlParams
        }
      })
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      this.loadDataTopics()
    }
  }
}
