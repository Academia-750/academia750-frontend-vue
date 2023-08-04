import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'

// This will be replaced by the real groups data from the API
export default {
  /**
   * @param {string} code
   * @param {string} name
   * @param {string} color
   */
  async create(id, { name, type }) {
    const response = await ResourceService.post(`workspace/${id}/add`, { name, type })

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
  async info(id) {
    const response = await ResourceService.get(`material/${id}/info`)

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
    const response = await ResourceService.delete(`material/${id}`)

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * @param {string[]} codes
   * @param {string[]} names
   * @param {string[]} colors
   * @param {string} content Search by names or color from a partial value
   * @param {string} orderBy (Only Allowed values)
   * @param {number} order 1 (ASC) -1 (DESC)
   * @param {number} offset
   * @param {number} limit
   */
  async list({ withCount, orderBy, offset, limit, content }) {
    const params = {
      withCount,
      orderBy,
      offset,
      limit,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('material/list', { params })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return { results: response.data.results, total: response.data.total }
  },
  async listOfTags({ withCount, orderBy, offset, limit, content }) {
    const params = {
      withCount,
      orderBy,
      offset,
      limit,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('material/tag', { params })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return { results: [], total: 0 }
    }

    return { results: response.data.results, total: response.data.total }
  },
  /**
   * @param {string} code
   * @param {string} name
   * @param {string} color
   */
  async update(id, { name, type }) {
    const response = await ResourceService.put(`material/${id}`, {
      name,
      type
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
  }
}
