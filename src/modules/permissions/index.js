import ProfilesStore from './profiles-list/profiles.store'
import PermissionsStore from './update-profile/permissions.store'
import router from './profiles.router'

export default {
  stores: [ProfilesStore, PermissionsStore],
  router
}
