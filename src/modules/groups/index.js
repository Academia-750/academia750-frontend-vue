import groupStore from './group-list/group.store'
import groupStudentsStore from './group-students/group-students.store'

import router from './group.router'

export default {
  stores: [groupStore, groupStudentsStore],
  router
}
