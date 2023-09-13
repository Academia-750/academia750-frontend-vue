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
      if (rolesUserAuth[0] === 'admin' && rolesUserAuth.includes(roles) ) {
        canDisplayItem = true
      }
      if (permissionsUserAuth[0] === 'generate-tests' && !roles.includes('admin')) {
        canDisplayItem = true
      }
    })

    return canDisplayItem
  }

  return roles === '*'
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
