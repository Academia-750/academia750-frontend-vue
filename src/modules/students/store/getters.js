export default {
  get_user_authenticated(state) {
    return state.user
  },
  get_permissions(state) {

    const permissionsOfEachRole = state.user ? state.user.relationships.roles.data.map((role) => {
      return role.relationships.permissions.data.map((permission) => {
        return permission.attributes.permissionName
      })
    }) : []

    const permissions = []

    permissionsOfEachRole.forEach((permission) => {
      permission.forEach((item) => {
        permissions.push(item)
      })
    })

    return permissions

  },
  get_roles(state) {
    return state.user ? state.user.relationships.roles.data.map((role) => {
      return role.attributes.roleName
    }) : []
  },
  get_is_verified_email(state) {
    return state.user.attributes.email_verified_at ? state.user.attributes.email_verified_at : 'El correo no ha sido verificado'
  }
}
