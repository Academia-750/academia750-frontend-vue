import ResourceService from '@/services/ResourceService'

const resource = 'topics'

export default {
  getAllQuestions(topic_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/questions`, config)
  },
  get(topic_id, question_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/questions/${question_id}`, config)
  },
  create(topic_id, data, config = {}) {
    return ResourceService.post(`${resource}/${topic_id}/relationship/questions/create`, data, config)
  },
  update(topic_id, question_id, data, config = {}) {
    return ResourceService.post(`${resource}/${topic_id}/relationship/questions/update/${question_id}`, data, config)
  },
  delete(topic_id, question_id, config = {}) {
    return ResourceService.delete(`${resource}/${topic_id}/relationship/questions/delete/${question_id}`, config)
  },
  import(data, config = {}) {
    return ResourceService.post('questions/import', data, config)
  },
  downloadTemplateImport(config = {}) {
    return ResourceService.get('questions/import/template', config)
  },
  setEditModeQuestion(question_id, data, config = {}) {
    return ResourceService.post(`questions/set-mode-edit/${question_id}/tests`, data, config)
  },
  setStateVisibilityQuestion(question_id, data, config = {}) {
    return ResourceService.post(`questions/set-state-visibility-question/${question_id}/tests`, data, config)
  }
}
