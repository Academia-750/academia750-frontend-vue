import ResourceService from '@/services/ResourceService'

const resource = 'tests'

export default {
  getUnresolvedTests(config = {}) {
    return ResourceService.get(`${resource}/unresolved`, config)
  },
  fetchUnresolvedTest(test_id, config = {}) {
    return ResourceService.get(`${resource}/fetch/unresolved/${test_id}`, config)
  },
  generateTestWithQuestions(data, config = {}) {
    return ResourceService.post(`${resource}/generate/questions`, data, config)
  }
}
