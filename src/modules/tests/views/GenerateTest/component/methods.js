export default {
  methods: {
    removeTopicSelected(topic_id) {
      this.topicsSelected = this.topicsSelected.filter((topic) => topic.id !== topic_id)

      this.$refs['selectTopicsByDatatable'].topicsSelected = this.topicsSelected
    },
    clearTopicsSelected () {
      /* console.log('Limpiar temas seleccionados')
      console.log({
        topicsSelected: this.topicsSelected
      }) */

      if (this.topicsSelected.length > 0) {
        this.topicsSelected = []
        //console.log(this.$refs['selectTopicsByDatatable'])

        this.$refs['selectTopicsByDatatable'].topicsSelected = []
        this.$refs['selectTopicsByDatatable'].SET_ITEMS_DATATABLE([])

        this.realodDataWithFiltersBySearchTopics()
      }

    },
    realodDataWithFiltersBySearchTopics () {
      if (this.oppositionSelected.length > 0 && this.topicGroupSelected.length > 0) {
        return
      }

      this.$refs['selectTopicsByDatatable'].loadDatatable()

    },
    async CreateTest() {

      const statusValidate = await this.$refs['FormCreateTest'].validate()

      if (!statusValidate) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonCreateTest = true
      this.disabledButtonCreateTest = true
      this.CreateTestApi()
    },
    async ResetForm() {
      //await this.$refs['FormCreateTest']['reset']()
      /* this.$nextTick(() => {
        this.$refs['FormCreateTest']['reset']()
      }) */
      this.loadingButtonCreateTest = false
      this.disabledButtonCreateTest = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateTest']['setErrors'](errorResponse)
    }
  }
}
