import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'

// This will be replaced by the real groups data from the API
export default {
  /**
   * @param {string} name
   */
  async create({ name }) {
    const response = await ResourceService.post('workspace', { name })

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
   * @param {string} content Search by names or color from a partial value
   * @param {string} orderBy (Only Allowed values)
   * @param {number} order 1 (ASC) -1 (DESC)
   * @param {number} offset
   * @param {number} limit
   */
  async list({ order, orderBy, offset, limit, content } = {}) {
    const params = {
      order,
      orderBy,
      offset,
      limit,
      content: content || undefined
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
   * @param {string} name
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
   * @param {string} content
   * @param {number} limit
   */
  async searchWorkspaces({ content, limit }) {
    const response = await ResourceService.get('workspace/search', {
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
  },

  /**
   * @param {string} id
   */
  async workspaceInfo(id) {
    const response = await ResourceService.get(`workspace/${id}/info`)

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return null
    }

    return response.data.result
  }
}
