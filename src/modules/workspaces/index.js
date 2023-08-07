import WorkspaceStore from './workspace-list/workspaces.store'
import WorkspaceMaterialStore from './workspace-material-list/workspaces.material.store'

import router from './workspace.router'

export default {
  stores: [WorkspaceStore, WorkspaceMaterialStore],
  router
}
