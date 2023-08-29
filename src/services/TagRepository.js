import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'
import Swal from 'sweetalert2/dist/sweetalert2'

export default {
  /**
   * @param {string} name
   */
  async create({ name }) {
    const response = await ResourceService.post('material/tag', { name })

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.result
  },
  /**
   * @param {string} content Search by names from a partial value
   * @param {string} orderBy (Only Allowed values)
   * @param {number} order 1 (ASC) -1 (DESC)
   * @param {number} offset
   * @param {number} limit
   */
  async list({ orderBy, order, limit, offset, content } = {}
  ) {
    const params = {
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('material/tag', {
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
   */
  async delete(id) {
    const response = await ResourceService.delete(`material/tag/${id}`)

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  }
}
