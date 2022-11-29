import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('subtopicsOfTopicService', ['getSubtopics'])
  }
}
