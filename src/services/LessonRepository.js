import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'
import Swal from 'sweetalert2/dist/sweetalert2'

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
        title: 'Información Duplicada',
        message: 'Ya existe un grupo con el mismo código o color'
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
  async lessonStudentList( lessonId, { orderBy, order, limit, offset, content } = {}) {
    const params = {
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get(`lesson/${lessonId}/students`, { params })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return { results: response.data.results, groups: response.data.groups, total: response.data.total }
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
      Swal.fire({
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        icon: 'warning',
        title: `${response.status} ${response.statusText}`,
        text: 'La estudiante ya existe'
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
  }
}
