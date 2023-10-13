<template>
  <div>
    <div ref="sectionTabsItemsGroupsByStatusAccount">
      <div flat>
        <WorkspaceList />
      </div>
    </div>
  </div>
</template>

<script>
import notifications from '@/mixins/notifications'

export default {
  name: 'WorkspaceView',
  components: {
    WorkspaceList: () =>
      import(
        /* webpackChunkName: "WorkspaceList" */ './components/workspace-list.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted() {
    this.loadNotifications()
  },
  head: {
    title: {
      inner: 'Gestión de Categorías'
    }
  }
}
</script>
