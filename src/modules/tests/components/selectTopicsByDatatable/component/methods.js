import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('topicsService', ['SET_ITEMS_DATATABLE']),
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.loadDataTopics()
    },
    loadDataTopics() {
      /* const urlParams = this.buildQueryParamsRequest()

      urlParams['opposition-id'] = this.oppositionId
      urlParams['topic-group-id'] = this.topicGroupId */
      //urlParams['filter[oppositions]'] = this.oppositionId
      //urlParams['filter[topic-group]'] = this.topicGroupId
      //urlParams['filter[has-questions-available]'] = '0'

      if (this.topicsGroupId?.length === 0) {

        this.SET_ITEMS_DATATABLE([])
        /* this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        }) */
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
