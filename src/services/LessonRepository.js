import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'

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
  }
}
