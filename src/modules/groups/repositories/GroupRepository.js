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
  delete(id) {
    return ResourceService.delete(`group/delete/${id}`)
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
  list({ codes, names, colors, orderBy, limit, offset, content }) {
    return ResourceService.get('group/list', {
      codes,
      names,
      colors,
      orderBy,
      limit,
      offset,
      content
    })
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
