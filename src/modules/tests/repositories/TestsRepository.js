import ResourceService from '@/services/ResourceService'

const resource = 'tests'

export default {
  getUnresolvedTests(config = {}) {
    return ResourceService.get(`${resource}/unresolved`, config)
  },
  getCardsMemory(config = {}) {
    return ResourceService.get(`${resource}/cards-memory`, config)
  },
  fetchUnresolvedTest(test_id, config = {}) {
    return ResourceService.get(`${resource}/fetch/unresolved/${test_id}`, config)
  },
  fetchCardMemory(test_id, config = {}) {
    return ResourceService.get(`${resource}/fetch/card-memory/${test_id}`, config)
  },
  generateTestWithQuestions(data, config = {}) {
    return ResourceService.post(`${resource}/create-a-quiz`, data, config)
  },
  claimQuestion(data, config = {}) {
    return ResourceService.post('questions/claim/academia', data, config)
  },
  resolveQuestion(data, config = {}) {
    return ResourceService.post(`${resource}/questionnaire/resolve-question`, data, config)
  }
}
