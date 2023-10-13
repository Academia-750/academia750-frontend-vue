import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'
import Toast from '@/utils/toast'

export default {
  /**
   * @param {string} name
   * @param {string} date
   * @param {string} start_time
   * @param {string} end_time
   */
  async create({ name, date, start_time, end_time }) {
    const response = await ResourceService.post('lesson', {
      name,
      date,
      start_time,
      end_time
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.result
  },
  /**
   * @param {string} name
   * @param {string} description
   * @param {string} date
   * @param {string} start_time
   * @param {string} end_time
   * @param {string} is_online
   * @param {string} url
   */
  async update(
    id,
    { name, description, date, start_time, end_time, is_online, url }
  ) {
    const response = await ResourceService.put(`lesson/${id}`, {
      name,
      description,
      date,
      start_time,
      end_time,
      is_online,
      url
    })

    if (response.status === 409) {
      ResourceService.warning({
        response,
        title: 'Acción no requerida',
        message: 'Este material ya está disponible en la lección.'
      })

      return false
    }

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.result
  },
  /**
   * @param {string} id
   */
  async delete(id) {
    const response = await ResourceService.delete(`lesson/${id}`)

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string} from
   * @param {string} to
   * @param {number} content
   */
  async calendar({ from, to, content } = {}) {
    const params = {
      from,
      to,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('lesson/calendar', { params })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return { results: response.data.results }
  },
  /**
   * @param {string} from
   * @param {string} to
   * @param {number} content
   */
  async studentCalendar({ from, to, content } = {}) {
    const params = {
      from,
      to,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('student-lessons/calendar', {
      params
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return { results: response.data.results }
  },
  /**
   * @param {string} id
   */
  async info(id) {
    const response = await ResourceService.get(`lesson/${id}`)

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return response.data.result
  },
  /**
   * @param {string} id
   * @param {string} active
   */
  async active(id, { active }) {
    const response = await ResourceService.put(`lesson/${id}/active`, {
      active: active
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string} content Search by names from a partial value
   * @param {string} orderBy (Only Allowed values)
   * @param {number} order 1 (ASC) -1 (DESC)
   * @param {number} offset
   * @param {number} limit
   * @param {string} lessonId
   */
  async lessonStudentList(
    lessonId,
    { orderBy, order, limit, offset, content } = {}
  ) {
    const params = {
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get(`lesson/${lessonId}/students`, {
      params
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return {
      results: response.data.results,
      groups: response.data.groups,
      total: response.data.total
    }
  },
  /**
   * @param {string} id
   * @param {string} student_id
   */
  async addStudentToLesson(id, { student_id }) {
    const response = await ResourceService.post(`lesson/${id}/student`, {
      user_id: student_id
    })

    if (response.status === 409) {
      Toast.warning('Este estudiante ya existe en esta clase')

      return false
    }

    if (response.status === 403) {
      Toast.warning(
        'Estudiante sin acceso a clases.',
        'El perfil de este estudiante no le permite acceder a las clases. Actualize su perfil por uno con los permisos adecuados'
      )

      return false
    }

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string} id
   * @param {string} active
   */
  async addGroupToLesson(id, { group_id }) {
    const response = await ResourceService.post(`lesson/${id}/group`, {
      group_id
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return { count: response.data.count }
  },
  /**
   * @param {string} id
   * @param {string} student_id
   */
  async deleteStudentFromLesson(id, { student_id }) {
    const response = await ResourceService.delete(`lesson/${id}/student`, {
      data: {
        user_id: student_id
      }
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string} id
   * @param {string} group_id
   */
  async deleteGroupFromLesson(id, { group_id }) {
    const response = await ResourceService.delete(`lesson/${id}/group`, {
      data: {
        group_id
      }
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string} id
   * @param {string} type
   * @param {string} tags[0]
   * @param {string} orderBy
   * @param {string} order
   * @param {string} limit
   * @param {string} offset
   * @param {string} content
   */
  async listOfMaterials(
    id,
    { type, tags, orderBy, order, limit, offset, content } = {}
  ) {
    const params = {
      type: type || undefined,
      tags,
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get(`lesson/${id}/materials`, {
      params
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return { results: response.data.results }
  },
  /**
   * @param {string} id
   * @param {string} material_id
   */
  async addMaterialsToLesson(id, { material_id } = {}) {
    const params = {
      material_id
    }

    deleteUndefined(params)
    const response = await ResourceService.post(`lesson/${id}/material`, params)

    if (response.status === 409) {
      ResourceService.warning({
        response,
        title: 'Información Duplicada',
        message: 'El material ya esta siendo usado en esta clase'
      })

      return false
    }

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string} id
   * @param {string} material_id
   */
  async deleteMaterialsFromLesson(id, { material_id } = {}) {
    const response = await ResourceService.delete(`lesson/${id}/material`, {
      data: {
        material_id
      }
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string} id
   *  @param {string} join
   */
  async joinLesson(id, join) {
    const response = await ResourceService.put(`student-lessons/${id}/join`, {
      join
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string} id
   * @param {string} orderBy
   * @param {string} willJoin
   * @param {string} order
   * @param {string} limit
   * @param {string} offset
   * @param {string} content
   */
  async lessonAttendees(
    id,
    { orderBy, willJoin, order, limit, offset, content } = {}
  ) {
    const params = {
      willJoin,
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get(`lesson/${id}/students`, {
      params
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0, will_join_count: 0 }
    }

    return {
      results: response.data.results,
      total: response.data.total,
      will_join_count: response.data.will_join_count
    }
  },

  /**
   * @param {string} type
   * @param {string} tags
   * @param {string} lessons
   * @param {string} workspaces
   * @param {string} orderBy
   * @param {string} order
   * @param {string} limit
   * @param {string} offset
   * @param {string} content
   */
  async studentsMaterialList({
    type,
    tags,
    lessons,
    workspaces,
    orderBy,
    order,
    limit,
    offset,
    content
  } = {}) {
    const params = {
      type: type || undefined,
      tags,
      lessons,
      workspaces,
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('student-lessons/materials', {
      params
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return { results: response.data.results, total: response.data.total }
  },
  /**
   * @param {string} id
   */
  async downloadStudentMaterial(id) {
    const response = await ResourceService.get(`student-lessons/${id}/download`)

    if (response.status === 424) {
      ResourceService.warning({
        title: 'Error al descargar el fichero',
        message: `Contacte con el administrador.\nError Original: ${response.data.error}`,
        response
      })

      return false
    }

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.url
  },
  /**
   * @param {string} content
   * @param {number} limit
   */
  async searchLessons({ content, limit }) {
    const response = await ResourceService.get('student-lessons/search', {
      params: {
        content: content || undefined,
        limit
      }
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return []
    }

    return response.data.results
  }
}
