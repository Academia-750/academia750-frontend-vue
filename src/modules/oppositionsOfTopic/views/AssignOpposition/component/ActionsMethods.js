/* eslint-disable prefer-destructuring */
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('oppositionsOfTopicService', ['assignOppositionTopic']),
    async AssignOppositionApi () {
      try {
        const subtopicsSelected = this.$refs['selectSubtopicsByDatatable'].subtopicsSelected
        const opposition = this.$refs['selectOppositionByDatatable'].oppositionSelected[0]
        let subtopics_id = null
        let dataRequest = {
          'opposition-id': opposition.id
        }

        if (Array.isArray(subtopicsSelected) && subtopicsSelected.length > 0) {
          subtopics_id = subtopicsSelected.map((item) => {
            return item.id
          })

          dataRequest = {
            'opposition-id': opposition.id,
            'subtopics': subtopics_id
          }
        }

        await this.assignOppositionTopic({
          topic_id: this.$route.params.id,
          data: dataRequest,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La oposición ha sido agregada con éxito.',
          timer: 7000
        })

        this.$router.push({
          name: 'manage-oppositions-of-topic',
          params: {
            id: this.$route.params.id
          }
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOpposition = false
        this.disabledButtonCreateopposition = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOpposition = false
        this.disabledButtonCreateOpposition = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } /* else if (error.response?.status === 422) {
          this.ResetForm()
          this.handlingErrorValidation(error.response.data.errors)
        } */
      }
    }
  }
}
