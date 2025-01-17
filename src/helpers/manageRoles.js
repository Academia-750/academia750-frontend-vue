import $store from '@/store'
import { activateError } from '@/helpers/manageErrors'
import { hasPermissions } from './managePermissions'

export const hasRoles = (roles, rolesUserAuth = null) => {
  rolesUserAuth = rolesUserAuth ?? $store.getters['profileService/get_roles']

  if (!roles) {
    return false
  }
  if (roles === '*') {
    return true
  }

  const rolesArray = Array.isArray(roles) ? roles : [roles]

  return rolesArray.some((roles) => rolesUserAuth.includes(roles))
}

export const hasRolesOrPermissions = (roles, permissions) => {
  return hasRoles(roles) || hasPermissions(permissions)
}

export const hasRoleMiddleware = (role) => {
  if (!hasRoles(role)) {
    activateError({
      status: 404,
      message: 'Pagina no encontrada'
    })

    return
  }
}

export const hasRoleOrPermissionsMiddleware = (role, permissions) => {
  if (!hasRoles(role) && !hasPermissions(permissions)) {
    activateError({
      status: 404,
      message: 'Pagina no encontrada'
    })

    return
  }
}

export default {
  hasRoles
}
