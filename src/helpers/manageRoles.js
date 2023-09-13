import $store from '@/store'
import { activateError } from '@/helpers/manageErrors'

export const hasRoles = (roles, rolesUserAuth = null, permissionsUserAuth = null) => {
  let canDisplayItem = false

  permissionsUserAuth = permissionsUserAuth ?? $store.getters['profileService/get_permissions']
  // permissions = permissions ? permissions : '*'
  rolesUserAuth = rolesUserAuth ?? $store.getters['profileService/get_roles']
  //roles = roles ? roles : '*'

  if (roles !== '*' && roles) {
    const rolesArray = Array.isArray(roles) ? roles : [roles]
    
    rolesArray.forEach((roles) => {
      if (rolesUserAuth.includes(roles) ) {
        canDisplayItem = true
      }
    })

    return canDisplayItem
  }

  return roles === '*'
}

export const hasPermission = (permissions, permissionsUserAuth = null) => {
  let canDisplayItem = false

  permissionsUserAuth = permissionsUserAuth ?? $store.getters['profileService/get_permissions']
  // permissions = permissions ? permissions : '*'
  console.log(permissionsUserAuth.includes(permissions[0]))
  canDisplayItem = permissionsUserAuth.includes(permissions[0])

  return canDisplayItem
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

export default {
  hasRoles
}
