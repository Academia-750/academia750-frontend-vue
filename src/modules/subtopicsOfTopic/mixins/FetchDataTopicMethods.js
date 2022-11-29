import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('topicsService', ['fetchTopic']),
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
