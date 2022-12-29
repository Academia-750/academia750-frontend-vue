import ResourceService from '@/services/ResourceService'

const resource = 'users/student/tests'

export default {
  getHistoryTestsCompletedByStudent(config = {}) {
    return ResourceService.get(`${resource}/fetch/history-tests-completed`, config)
  }
}
