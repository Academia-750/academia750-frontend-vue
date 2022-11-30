/* eslint-disable prefer-destructuring */
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('oppositionsOfTopicService', ['getSubtopicsOfOppositionsByTopic','updateSubtopicsOfOppositionByTopic']),
    async fetchSubtopicsOppositionByTopicForUpdate () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonUpdateOpposition = true

        const response = await this.getSubtopicsOfOppositionsByTopic({
          topic_id: this.$route.params.id,
          opposition_id: this.$route.params.opposition_id,
          config: {}
        })

        const subtopics_id_selected_opposition = response.data.data.map((subtopic) => {
          return {
            id: subtopic.id,
            name: subtopic.attributes.name
          }
        })

        this.$refs['selectSubtopicsByDatatable'].subtopicsSelected = subtopics_id_selected_opposition

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateOpposition = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateOpposition = false
      }
    },
    async UpdateSubtopicsOpposition () {
      try {

        const subtopicsSelected = this.$refs['selectSubtopicsByDatatable'].subtopicsSelected

        const dataRequest = {
          'subtopics': []
        }

        if (Array.isArray(subtopicsSelected) && subtopicsSelected.length > 0) {
          const subtopics_id = subtopicsSelected.map((item) => {
            return item.id
          })

          dataRequest['subtopics'] = subtopics_id
        }

        await this.updateSubtopicsOfOppositionByTopic({
          topic_id: this.$route.params.id,
          opposition_id: this.$route.params.opposition_id,
          data: dataRequest,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La oposición ha sido actualizada con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-oppositions-of-topic',
          params: {
            id: this.$route.params.id
          }
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateOpposition = false
        this.disabledButtonUpdateOpposition = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateOpposition = false
        this.disabledButtonUpdateOpposition = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        }
      }
    }
  }
}
