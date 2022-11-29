import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('oppositionsOfTopicService', ['getOppositionsAvailableByTopic'])
  }
}
