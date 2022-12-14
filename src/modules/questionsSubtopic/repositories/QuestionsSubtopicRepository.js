import ResourceService from '@/services/ResourceService'

const resource = 'subtopics'

export default {
  getAllQuestions(subtopic_id, config = {}) {
    return ResourceService.get(`${resource}/${subtopic_id}/relationship/questions`, config)
  },
  get(subtopic_id, question_id, config = {}) {
    return ResourceService.get(`${resource}/${subtopic_id}/relationship/questions/${question_id}`, config)
  },
  create(subtopic_id, data, config = {}) {
    return ResourceService.post(`${resource}/${subtopic_id}/relationship/questions/create`, data, config)
  },
  update(subtopic_id, question_id, data, config = {}) {
    return ResourceService.post(`${resource}/${subtopic_id}/relationship/questions/update/${question_id}`, data, config)
  },
  delete(subtopic_id, question_id, config = {}) {
    return ResourceService.delete(`${resource}/${subtopic_id}/relationship/questions/${question_id}/delete`, config)
  }
}
