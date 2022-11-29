import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('subtopicsOfTopicService', ['fetchSubtopic', 'updateSubtopic']),
    async fetchDataForUpdate () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonUpdateSubtopic = true

        const response = await this.fetchSubtopic({
          topic_id: this.$route.params.id,
          subtopic_id: this.$route.params.subtopic_id,
          config: {}
        })

        const { name } = response.data.data.attributes

        this.$refs['nameSubtopicInputComponent'].name_subtopic = name
        this.nameSubtopic = name

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateSubtopic = false

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateSubtopic = false
      }
    },
    async UpdateSubtopicApi () {
      try {
        await this.updateSubtopic({
          topic_id: this.$route.params.id,
          subtopic_id: this.$route.params.subtopic_id,
          data: {
            'name': this.form.nameSubtopic
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El subtema ha sido actualizado con éxito.',
          timer: 7000
        })

        /* this.$refs['nameSubtopicInputComponent'].name_subtopic = ''
        this.nameSubtopic = ''
        this.ResetForm() */

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateSubtopic = false
        this.disabledButtonUpdateSubtopic = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateSubtopic = false
        this.disabledButtonUpdateSubtopic = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.ResetForm()
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    }
  }
}
