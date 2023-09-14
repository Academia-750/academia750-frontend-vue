import store from '@/store'
import { activateError } from '@/helpers/manageErrors'

export const hasPermissions = (permissions, permissionsUserAuth = null) => {
  permissionsUserAuth =
    permissionsUserAuth ?? store.getters['profileService/get_permissions']

  // No permission requested
  if (!permissions) {
    return false
  }
  if (permissions === '*') {
    return true
  }

  const permissionsArray = Array.isArray(permissions)
    ? permissions
    : [permissions]

  return permissionsArray.every((permission) =>
    permissionsUserAuth.includes(permission)
  )
}

export const hasPermissionsMiddleware = (permissions) => {
  if (!hasPermissions(permissions)) {
    activateError({
      status: 404,
      message: 'Pagina no encontrada'
    })

    return
  }
}

export default {
  hasPermissions
}
