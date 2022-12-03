import ResourceService from '@/services/ResourceService'

const resource = 'subtopics'

export default {
  getAllQuestions(subtopic_id, config = {}) {
    return ResourceService.get(`${resource}/${subtopic_id}/relationship/questions`, config)
  },
  get(subtopic_id, subsubtopic_id, config = {}) {
    return ResourceService.get(`${resource}/${subtopic_id}/relationship/questions/${subsubtopic_id}`, config)
  },
  create(subtopic_id, data, config = {}) {
    return ResourceService.post(`${resource}/${subtopic_id}/relationship/questions/create`, data, config)
  },
  update(subtopic_id, subsubtopic_id, data, config = {}) {
    return ResourceService.patch(`${resource}/${subtopic_id}/relationship/questions/${subsubtopic_id}/update`, data, config)
  },
  delete(subtopic_id, subsubtopic_id, config = {}) {
    return ResourceService.delete(`${resource}/${subtopic_id}/relationship/questions/${subsubtopic_id}/delete`, config)
  }
}
