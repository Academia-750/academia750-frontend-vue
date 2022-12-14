import ImportsRepository from '../repositories/ImportsRepository'

const mapItemsDatatableFromApiImportProcesses = (itemsApi) => {
  return itemsApi.map((record) => {
    const { total_number_of_records, total_number_failed_records, total_number_successful_records } = record.attributes
    const has_records = total_number_of_records > 0

    return {
      id: record.id,
      'name-file': record.attributes.name_file,
      'category': record.attributes.category,
      'total-number-of-records': has_records ? total_number_of_records : 'Sin informacion',
      'total-number-failed-records': has_records ? total_number_failed_records : 'Sin informacion',
      'total-number-successful-records': has_records ? total_number_successful_records : 'Sin informacion',
      'created-at': record.attributes.created_at
    }
  })
}

const mapItemsDatatableFromApiImportRecord = (itemsApi) => {
  return itemsApi.map((record) => {
    return {
      id: record.id,
      'number-of-row': record.attributes.number_of_row,
      'has-errors': record.attributes.has_errors,
      'errors_validation': record.attributes.errors_validation,
      'created-at': record.attributes.created_at
    }
  })
}

const mapMetaInformationPagination = (response) => {
  return {
    current_page: response.data.meta.current_page,
    from: response.data.meta.from,
    last_page: response.data.meta.last_page,
    per_page: response.data.meta.per_page,
    to: response.data.meta.to,
    total: response.data.meta.total
  }
}

const getImportProcesses = async ({ commit }, options) => {

  try {

    commit('SET_INFORMATION_META', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS', true)

    commit('SET_ITEMS_DATATABLE', [])

    const response = await ImportsRepository.getProcessFiles(options.config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApiImportProcesses(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const getImportRecords = async ({ commit }, options) => {

  try {

    commit('SET_INFORMATION_META', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS', true)

    commit('SET_ITEMS_DATATABLE', [])

    const response = await ImportsRepository.getRecordsImportFile(options.import_process_id, options.config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApiImportRecord(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getImportProcesses,
  getImportRecords
}
