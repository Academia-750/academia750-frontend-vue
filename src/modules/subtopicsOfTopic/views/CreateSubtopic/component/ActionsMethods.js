import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('subtopicsOfTopicService', ['createSubtopic']),
    ...mapActions('topicsService', ['fetchTopic']),
    async CreateSubtopicApi () {
      try {
        await this.createSubtopic({
          topic_id: this.$route.params.id,
          data: {
            'name': this.form.nameSubtopic
          }
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El subtema ha sido creado con éxito.',
          timer: 7000
        })

        this.$refs['nameSubtopicInputComponent'].name_subtopic = ''
        this.nameSubtopic = ''
        this.ResetForm()

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateSubtopic = false
        this.disabledButtonCreateSubtopic = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateSubtopic = false
        this.disabledButtonCreateSubtopic = false
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
    },
    async fetchDataTopic () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        const response = await this.fetchTopic({
          id: this.$route.params.id,
          config: {}
        })

        this.topicData = response.data.data

        this.$loadingApp.disabledLoadingProgressLinear()

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateTopic = false
      }
    }
  }
}
