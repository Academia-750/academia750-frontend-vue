import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'

const resource = 'groups'

// This will be replaced by the real groups data from the API
export default {
  /**
   * @param {string} code
   * @param {string} name
   * @param {string} color
   */
  async create({ code, name, color }) {
    const response = await ResourceService.post('group', { code, name, color })

    if (response.status === 409) {
      // TODO handle duplicated code / color error
      return false
    }

    if (response.status !== 200) {
      // TODO handle error ?
      return false
    }

    return response.data.result
  },
  /**
   * @param {string} id
   */
  async delete(id) {
    const response = await ResourceService.delete(`group/${id}`)

    if (response.status !== 200) {
      // TODO handle error ?
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
  async list({ codes, names, colors, orderBy, order, limit, offset, content }) {
    const params = {
      codes,
      names,
      colors,
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('group/list', { params })

    if (response.status !== 200) {
      // TODO handle error ?
      return { results: [], total: 0 }
    }

    return { results: response.data.results, total: response.data.total }
  },
  /**
   *
   */
  async colors() {
    const response = await ResourceService.get('group/colors')

    if (response.status !== 200) {
      // TODO handle error ?
      return []
    }

    return Object.values(response.data.results)
  },
  /**
   * @param {string} id
   */
  info(id) {
    return ResourceService.get(`group/${id}`)
  },
  /**
   * @param {string} code
   * @param {string} name
   * @param {string} color
   */
  async update(id, { code, name, color }) {
    const response = await ResourceService.put(`group/${id}`, {
      code,
      name,
      color
    })

    if (response.status === 409) {
      // TODO handle duplicated code / color error
      return false
    }

    if (response.status !== 200) {
      // TODO handle error ?
      return false
    }

    return response.data.result
  },

  /**
   * @param {string} group_id
   * @param {string} user_id
   */
  joinGroup({ group_id, user_id }) {
    return ResourceService.post(`group/${group_id}/join`, { user_id })
  },

  /**
   * @param {string} group_id
   * @param {string} user_id
   */
  leaveGroup({ group_id, user_id }) {
    return ResourceService.post(`group/${group_id}/leave`, { user_id })
  },
  /**
   * @param {boolean} discharged False: List of active students, true: list of current students
   * @param {string} content Search by names or color from a partial value
   * @param {string} orderBy (Only Allowed values)
   * @param {number} order 1 (ASC) -1 (DESC)
   * @param {number} offset
   * @param {number} limit
   */
  studentsList(groupId, { discharged, orderBy, limit, offset, content }) {
    return ResourceService.get(`group/${groupId}/list`, {
      discharged,
      orderBy,
      limit,
      offset,
      content
    })
  }
}
