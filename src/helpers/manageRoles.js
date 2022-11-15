import store from '@/store'

export const hasRoles = (roles, rolesUserAuth = null) => {

  rolesUserAuth = rolesUserAuth ?? store.getters['profileService/get_roles']
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

export default {
  hasRoles
}
