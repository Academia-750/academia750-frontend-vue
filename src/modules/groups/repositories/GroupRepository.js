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
  create({ code, name, color }) {
    return ResourceService.post('groups', { code, name, color })
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
  colors() {
    return ResourceService.get('group/colors')
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
  update(id, { code, name, color }) {
    return ResourceService.put(`group/update/${id}`, { code, name, color })
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
