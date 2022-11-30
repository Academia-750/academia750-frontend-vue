import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('oppositionsOfTopicService', ['getOppositions', 'unassignOppositionOfTopic']),
    async unassignOppositionAction () {
      if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
        return
      }

      try {
        await this.unassignOppositionOfTopic({
          topic_id: this.$route.params.id,
          opposition_id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La oposición ha sido eliminada del tema con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.getOppositions({
          topic_id: this.$route.params.id,
          config: {
            params: this.buildQueryParamsRequest()
          }
        }).then( (response) => {
          this.topicData = response.data.meta.topic
        } )
      } catch (error) {
        console.log(error)
      }
    }
  }
}
