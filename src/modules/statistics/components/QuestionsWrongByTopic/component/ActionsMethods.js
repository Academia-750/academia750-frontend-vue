import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('statisticsService', ['getHistoryQuestionsWrongByTopic'])
  }
}
