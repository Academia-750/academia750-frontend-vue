import ResourceService from '@/services/ResourceService'

const resource = 'oppositions'

export default {
  getAll(config = {}) {
    return ResourceService.get(`v1/${resource}`, config)
  },
  get(id, config = {}) {
    return ResourceService.get(`v1/${resource}/${id}`, config)
  },
  create(data, config = {}) {
    return ResourceService.post(`v1/${resource}/create`, data, config)
  },
  update(id, data, config = {}) {
    return ResourceService.patch(`v1/${resource}/update/${id}`, data, config)
  },
  delete(id, config = {}) {
    return ResourceService.delete(`v1/${resource}/delete/${id}`, config)
  },
  actionMassiveSelection(data, config = {}) {
    return ResourceService.post(`v1/${resource}/mass-selection-action`, data, config)
  },
  export(data, config = {}) {
    return ResourceService.post(`v1/${resource}/export`, data, config)
  },
  import(data, config = {}) {
    return ResourceService.post(`v1/${resource}/import`, data, config)
  },
  downloadTemplateImport(config = {}) {
    return ResourceService.get(`v1/${resource}/import/template`, config)
  }
}
