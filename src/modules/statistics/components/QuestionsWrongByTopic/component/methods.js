export default {
  methods: {
    searchFieldExecuted ($event) {
      if (!this.topic_id) {

        /* this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, seleccione 1 tema',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        }) */

        this.searchWord = null

        return
      }

      this.searchWord = $event
      this.loadDatatatable()
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      if (!this.topic_id) {

        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, seleccione 1 tema',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      this.getHistoryQuestionsWrongByTopic({
        topic_id: this.topic_id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      })
    }
  }
}
