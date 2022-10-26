import store from '@/store'

export const hasPermissions = (permissions) => {
  const permissionsUserAuth = store.getters['profileService/get_permissions']
  //permissions = permissions ? permissions : '*'

  if (permissions !== '*' && permissions) {
    const permissionsArray = Array.isArray(permissions) ? permissions : [permissions]
    let displayNavItem = false

    permissionsArray.forEach((permission) => {
      if (permissionsUserAuth.includes(permission)) {
        displayNavItem = true
      }
    })

    return displayNavItem
  }

  return permissionsNavItem === '*'
}

export default {
  hasPermissions
}
