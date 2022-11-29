import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('subtopicsOfTopicService', ['getSubtopics', 'deleteSubtopic']),
    async deleteSubtopicAction () {
      if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
        return
      }

      try {
        await this.deleteSubtopic({
          topic_id: this.$route.params.id,
          subtopic_id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El subtema ha sido eliminado con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        await this.getSubtopics({
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
