import $store from '@/store'
import { activateError } from '@/helpers/manageErrors'

export const hasRoles = (roles, rolesUserAuth = null) => {

  rolesUserAuth = rolesUserAuth ?? $store.getters['profileService/get_roles']
  //permissions = permissions ? permissions : '*'

  if (roles !== '*' && roles) {
    const rolesArray = Array.isArray(roles) ? roles : [roles]
    let canDisplayItem = false

    rolesArray.forEach((roles) => {
      if (rolesUserAuth.includes(roles)) {
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
