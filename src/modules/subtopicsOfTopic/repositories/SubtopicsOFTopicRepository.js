import ResourceService from '@/services/ResourceService'

const resource = 'topics'

export default {
  getAllSubtopics(topic_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/subtopics`, config)
  },
  get(topic_id, subtopic_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/subtopics/${subtopic_id}`, config)
  },
  create(topic_id, data, config = {}) {
    return ResourceService.post(`${resource}/${topic_id}/relationship/subtopics/create`, data, config)
  },
  update(topic_id, subtopic_id, data, config = {}) {
    return ResourceService.patch(`${resource}/${topic_id}/relationship/subtopics/${subtopic_id}/update`, data, config)
  },
  delete(topic_id, subtopic_id,config = {}) {
    return ResourceService.delete(`${resource}/${topic_id}/relationship/subtopics/${subtopic_id}/delete`, config)
  }
}
