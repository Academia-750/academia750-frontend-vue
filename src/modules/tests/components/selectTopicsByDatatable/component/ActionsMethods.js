import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('topicsService', ['getTopicsAvailableForGenerateTest'])
  }
}
