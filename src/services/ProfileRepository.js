import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'

export default {
  /**
   * @param {string} name
   */
  async create({ name }) {
    const response = await ResourceService.post('role', {
      name
    })

    if (response.status === 409) {
      ResourceService.warning({
        response,
        title: 'Ya existe un perfil con ese nombre',
        message: ''
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
   * @param {string} content Search by names from a partial value
   * @param {string} orderBy (Only Allowed values)
   * @param {number} order 1 (ASC) -1 (DESC)
   * @param {number} offset
   * @param {number} limit
   */
  async list({ orderBy, order, limit, offset, content } = {}) {
    const params = {
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('role/list', {
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
      total: response.data.total
    }
  },
  /**
   * @param {string} name
   * @param {string} defaultRole
   */
  async update(id, { name, default_role }) {
    const response = await ResourceService.put(`role/${id}`, {
      name,
      default_role
    })

    if (response.status === 409) {
      ResourceService.warning({
        response,
        title: 'Ya existe un perfil con ese nombre',
        message: ''
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
    const response = await ResourceService.delete(`role/${id}`)

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
   */
  async info(id) {
    const roleId = id
    const response = await ResourceService.get(`role/${roleId}`)

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
  async listOfPermissions({ orderBy, order, limit, offset, content } = {}) {
    const params = {
      orderBy,
      order,
      limit,
      offset,
      content: content || undefined
    }

    deleteUndefined(params)
    const response = await ResourceService.get('role/permissions', {
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
      total: response.data.total
    }
  },
  /**
   * @param {string} permission_id
   * @param {string} roleId
   */
  async addPermission(permission_id, roleId) {
    const response = await ResourceService.post(`role/${roleId}/permission`, {
      permission_id
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
   * @param {string} permission_id
   * @param {string} roleId
   */
  async deletePermission(permission_id, roleId) {
    const response = await ResourceService.delete(`role/${roleId}/permission`, {
      data: { permission_id }
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
   * @param {string} userId
   * @param {string} roleId
   */
  async assignRole(user_id, role_id) {
    const response = await ResourceService.post('users/role', {
      user_id,
      role_id
    })

    if (response.status === 403) {
      ResourceService.warning({
        response,
        title: 'Información',
        message: 'No se puede cambiar el rol de un usuario administrador'
      })

      return false
    }

    if (response.status === 409) {
      ResourceService.warning({
        response,
        title: 'Información',
        message: 'No se permite asignar el rol de administrador'
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
   * @param {string} roleId
   * @param {string} permissionId
   * @param {object} config
   */
  async configPermission({ roleId, permissionId, config }) {
    const response = await ResourceService.put(
      `role/${roleId}/permission/${permissionId}`,
      {
        config
      }
    )

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return true
  },
  /**
   * Get all the permissions configuration whatever are enabled or not
   * @param {string} roleId
   */
  async getRoleConfigurations(roleId) {
    const response = await ResourceService.get(`role/${roleId}/configurations`)

    return response.data.results
  }
}
