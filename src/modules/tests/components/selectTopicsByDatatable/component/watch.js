export default {
  watch: {
    optionsDatatable: {
      handler() {
        if (this.oppositionId && this.topicsGroupId.length > 0) {

          this.loadDataTopics()
        }
      },
      deep: true
    },
    topicsSelected (value) {
      this.$emit('TopicsSelectedBinding',value)
    },
    oppositionId() {
      if (this.oppositionId && this.topicsGroupId.length > 0) {
        this.loadDataTopics()
      }
    },
    topicsGroupId: {
      handler () {
        if (this.oppositionId && this.topicsGroupId.length > 0) {
          this.loadDataTopics()
        }

        if (this.topicsGroupId?.length === 0) {

          this.SET_ITEMS_DATATABLE([])
        }
      },
      deep: true
    }
  }
}
