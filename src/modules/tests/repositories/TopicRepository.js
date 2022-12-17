import ResourceService from '@/services/ResourceService'

const resource = 'topics'

export default {
  getAll(config = {}) {
    return ResourceService.get(`${resource}/relationship/questions`, config)
  }
}
