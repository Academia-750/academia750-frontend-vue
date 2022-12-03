import ResourceService from '@/services/ResourceService'

const resource = 'topics'

export default {
  getAllQuestions(topic_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/questions`, config)
  },
  get(topic_id, subtopic_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/questions/${subtopic_id}`, config)
  },
  create(topic_id, data, config = {}) {
    return ResourceService.post(`${resource}/${topic_id}/relationship/questions/create`, data, config)
  },
  update(topic_id, subtopic_id, data, config = {}) {
    return ResourceService.patch(`${resource}/${topic_id}/relationship/questions/${subtopic_id}/update`, data, config)
  },
  delete(topic_id, subtopic_id, config = {}) {
    return ResourceService.delete(`${resource}/${topic_id}/relationship/questions/${subtopic_id}/delete`, config)
  }
}
