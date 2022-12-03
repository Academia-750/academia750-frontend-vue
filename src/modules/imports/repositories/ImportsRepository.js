import ResourceService from '@/services/ResourceService'

const resource = 'imports'

export default {
  getProcessFiles(config = {}) {
    return ResourceService.get(`${resource}/import-processes`, config)
  },
  getRecordsImportFile(import_process_id, config = {}) {
    return ResourceService.get(`${resource}/import-processes/${import_process_id}/relationship/import-records`, config)
  }
}
