import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('topicsService', ['getTopics', 'deleteTopic']),
    async deleteTopicAction() {
      if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
        return
      }

      try {
        await this.deleteTopic({
          id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El tema ha sido eliminado con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.getTopics({
          params: this.buildQueryParamsRequest()
        })
      } catch (error) {
        //console.log(error)
      }
    }
  }
}
