import ResourceService from '@/services/ResourceService'

const resource = 'users/student/tests'

export default {
  getHistoryTestsCompletedByStudent(config = {}) {
    return ResourceService.get(`${resource}/fetch/history-tests-completed`, config)
  },
  getHistoryStatisticsDataGraph(data, config = {}) {
    return ResourceService.post(`${resource}/fetch/history-statistical-data-graph`, data, config)
  },
  getHistoryQuestionsWrongByTopic(topic_id, config = {}) {
    return ResourceService.get(`${resource}/fetch/history-questions-wrong-by-topic/${topic_id}`, config)
  }
}
