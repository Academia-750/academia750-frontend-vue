import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'

// This will be replaced by the real groups data from the API
export default {
  /**
   * @param {string} code
   * @param {string} name
   * @param {string} color
   */
  async create({ name }) {
    const response = await ResourceService.post('workspace', { name })

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
    const response = await ResourceService.delete(`workspace/${id}`)

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
  async list({ withCount, orderBy, offset, limit }) {
    const params = {
      withCount,
      orderBy,
      offset,
      limit
    }

    deleteUndefined(params)
    const response = await ResourceService.get('workspace/list', { params })

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
  async info(id) {
    const response = await ResourceService.get(`group/${id}`)

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.result
  },

  /**
   * @param {string} code
   * @param {string} name
   * @param {string} color
   */
  async update(id, { name }) {
    const response = await ResourceService.put(`workspace/${id}`, {
      name
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
   * @param {string} group_id
   * @param {string} user_id
   */
  async joinGroup({ group_id, user_id }) {
    const response = await ResourceService.post(`group/${group_id}/join`, {
      user_id
    })

    if (response.status === 409) {
      ResourceService.warning({
        response,
        title: 'Warning',
        message: 'Este usuario ya existe en el grupo.'
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
   * @param {string} group_id
   * @param {string} user_id
   */
  async leaveGroup({ group_id, user_id }) {
    const response = await ResourceService.post(`group/${group_id}/leave`, {
      user_id
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
   * @param {boolean} discharged False: List of active students, true: list of current students
   * @param {string} content Search by names or color from a partial value
   * @param {string} orderBy (Only Allowed values)
   * @param {number} order 1 (ASC) -1 (DESC)
   * @param {number} offset
   * @param {number} limit
   */
  async studentsList(
    groupId,
    { discharged, orderBy, order, limit, offset, content }
  ) {
    const params = {
      discharged,
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get(`group/${groupId}/list`, {
      params
    })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return { total: response.data.total, results: response.data.results }
  }
}
