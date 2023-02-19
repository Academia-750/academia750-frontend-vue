import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('topicsService', ['SET_ITEMS_DATATABLE']),
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.loadDataTopics()
    },
    loadDataTopics() {

      if (this.topicsGroupId?.length === 0) {

        this.SET_ITEMS_DATATABLE([])
      }

      this.getTopicsAvailableForGenerateTest({
        data: {
          'opposition-id': this.oppositionId,
          'topics-group-id': this.topicsGroupId
        },
        config: {
          params: this.buildQueryParamsRequest()
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
