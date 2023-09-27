import StudentRepository from '../../../services/StudentRepository'

const mapItemsDatatableFromApi = (itemsApi) => {
  return itemsApi.map((record) => {
    return {
      id: record.id,
      dni: record.attributes.dni,
      'first-name': record.attributes.first_name,
      'last-name': record.attributes.last_name,
      phone: record.attributes.phone,
      email: record.attributes.email,
      'created-at': record.attributes.created_at,
      groups: record.relationships.groups,
      role: record.relationships.roles.data[0]?.attributes.roleAliasName
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

const getStudents = async ({ commit }, config) => {
  try {
    commit('SET_USERS_SELECTED_DATATABLE', [])
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

    const response = await StudentRepository.getAll(config)

    if (response) {
      //console.trace(response)

      commit(
        'SET_ITEMS_DATATABLE',
        mapItemsDatatableFromApi(response.data.data)
      )
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))
    }

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const createStudent = async (_, options) => {
  try {
    const response = await StudentRepository.create(options.data)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const setLesson = async ({ dispatch, commit }, payload) => {
  try {
    commit('SET_LESSON', payload)

    // We also clear the tables related to the selected lesson
    dispatch('lessonMaterialsStore/resetTableOptions', null, { root: true })
    dispatch(
      'lessonMaterialsStore/setTableItems',
      { results: [], total: 0 },
      { root: true }
    )

    dispatch('lessonStudentStore/resetTableOptions', null, { root: true })
    dispatch(
      'lessonStudentStore/setTableItems',
      { results: [], total: 0 },
      { root: true }
    )

    dispatch('materialsForLessonStore/resetTableOptions', null, {
      root: true
    })
    dispatch(
      'materialsForLessonStore/setTableItems',
      { results: [], total: 0 },
      { root: true }
    )

    return
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const fetchStudent = async ({ commit }, options) => {
  try {
    commit('SET_USERS_SELECTED_DATATABLE', [])
    const response = await StudentRepository.get(options.id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const updateStudent = async (_, options) => {
  try {
    const response = await StudentRepository.update(
      options.id,
      options.data,
      options.config
    )

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const deleteStudent = async (_, options) => {
  try {
    const response = await StudentRepository.delete(options.id, options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const fetchStudentGroups = async (_, options) => {
  try {
    const response = await StudentRepository.fetchStudentsGroups(options.config)

    return Promise.resolve(response)
  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const actionsForMultipleRecords = async ({ commit }, options) => {
  try {
    const response = await StudentRepository.actionMassiveSelection(
      options.data,
      options.config
    )

    commit('SET_USERS_SELECTED_DATATABLE', [])

    return Promise.resolve(response)
  } catch (error) {
    commit('SET_USERS_SELECTED_DATATABLE', [])
    //console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getStudents,
  createStudent,
  fetchStudent,
  updateStudent,
  deleteStudent,
  fetchStudentGroups,
  actionsForMultipleRecords,
  setLesson
}
