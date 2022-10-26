import store from '@/store'

export const hasPermissions = (permissionsNavItem) => {
  const permissionsUserAuth = store.getters['profileService/get_permissions']

  permissionsNavItem = permissionsNavItem ? permissionsNavItem : '*'

  if (permissionsNavItem !== '*' && permissionsNavItem) {
    const permissionsArray = Array.isArray(permissionsNavItem) ? permissionsNavItem : [permissionsNavItem]
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
