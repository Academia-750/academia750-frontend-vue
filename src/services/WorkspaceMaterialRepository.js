import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'
import { activateError } from '@/helpers/manageErrors'

// This will be replaced by the real groups data from the API
export default {
  /**
   * @param {string} type
   * @param {string} name
   */
  async create(id, { name, type }) {
    const response = await ResourceService.post(`workspace/${id}/add`, {
      name,
      type
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
   * @param {string} id
   */
  async info(id) {
    const response = await ResourceService.get(`material/${id}/info`)

    if (response.status === 404) {
      activateError({
        status: 404,
        message: 'Material no encontrado'
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
   * @param {string} content Search by names or color from a partial value
   * @param {string} orderBy (Only Allowed values)
   * @param {number} order 1 (ASC) -1 (DESC)
   * @param {number} offset
   * @param {number} limit
   * @param {number} tags
   * @param {number} type
   * @param {number} workspace
   */
  async list({
    order,
    orderBy,
    offset,
    limit,
    type,
    tags,
    workspace,
    content
  }) {
    const params = {
      order,
      orderBy,
      offset,
      limit,
      type: type || undefined,
      tags: tags.length ? tags : undefined,
      workspace: workspace || undefined,
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

  async listOfTags({ order, orderBy, offset, limit, content }) {
    const params = {
      order,
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
   * @param {string} name
   * @param {string} type
   * @param {string} tags
   * @param {string} url
   */
  async update(id, { name, type, tags, url, watermark }) {
    const response = await ResourceService.put(`material/${id}`, {
      name,
      type,
      tags,
      url,
      watermark
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
   * @param {string} type
   * @param {number} limit
   */
  async searchTags({ content, limit, type }) {
    const response = await ResourceService.get('material/tag', {
      params: {
        content: content || undefined,
        type,
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
