import ResourceService from '@/services/ResourceService'

const resource = 'topics'

export default {
  getAllOppositions(topic_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/oppositions`, config)
  },
  get(id, config = {}) {
    return ResourceService.get(`${resource}/${id}`, config)
  },
  assignOppositionWithSubtopicsByTopic(topic_id, data, config = {}) {
    return ResourceService.post(`${resource}/${topic_id}/relationship/oppositions/assign`, data, config)
  },
  update(id, data, config = {}) {
    return ResourceService.patch(`${resource}/update/${id}`, data, config)
  },
  delete(id, config = {}) {
    return ResourceService.delete(`${resource}/delete/${id}`, config)
  },
  getSyllabus(opposition_id, config = {}) {
    return ResourceService.get(`${resource}/${opposition_id}/relationship/syllabus`, config)
  },
  getOppositionsAvailableByTopic (topic_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/oppositions-available`, config)
  },
  getSubtopicsOfOppositionsByTopic (topic_id, opposition_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/oppositions/${opposition_id}/subtopics`, config)
    /* topics/{topic}/relationship/oppositions/{opposition}/subtopics */
  },
  updateSubtopicsOfOppositionByTopic (topic_id, opposition_id, data, config = {}) {
    return ResourceService.patch(`${resource}/${topic_id}/relationship/oppositions/${opposition_id}/update/subtopics`, data, config)
    /* topics/{topic}/relationship/oppositions/{opposition}/subtopics */
  },
  unassignOppositionOfTopic (topic_id, opposition_id, config = {}) {
    return ResourceService.delete(`${resource}/${topic_id}/relationship/oppositions/${opposition_id}/delete`, config)
  }
}
