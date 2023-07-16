import ResourceService from '@/services/ResourceService'

const resource = 'users'

export default {
  getAll(config = {}) {
    return ResourceService.get(`${resource}`, config)
  },
  get(id, config = {}) {
    return ResourceService.get(`${resource}/${id}`, config)
  },
  create(data, config = {}) {
    return ResourceService.post(`${resource}/create`, data, config)
  },
  update(id, data, config = {}) {
    return ResourceService.patch(`${resource}/update/${id}`, data, config)
  },
  delete(id, config = {}) {
    return ResourceService.delete(`${resource}/delete/${id}`, config)
  },
  actionMassiveSelection(data, config = {}) {
    return ResourceService.post(`${resource}/actions-on-multiple-records`, data, config)
  },
  fetchTopicsGroups (config = {}) {
    return ResourceService.get('topic-groups', config)
  },
  fetchRoleStudentData (config = {}) {
    return ResourceService.get('roles/get-data/student', config)
  },
  disableAccount(id, data, config = {}) {
    return ResourceService.post(`${resource}/disable-account/${id}`, data, config)
  },
  enableAccount(id, data, config = {}) {
    return ResourceService.post(`${resource}/enable-account/${id}`, data, config)
  },
  export(data, config = {}) {
    return ResourceService.post(`${resource}/export`, data, config)
  },
  import(data, config = {}) {
    return ResourceService.post(`${resource}/import`, data, config)
  },
  downloadTemplateImport(config = {}) {
    return ResourceService.get(`${resource}/import/template`, config)
  }
}
