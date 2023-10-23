<template>
  <div ref="sectionTabsItemsGroupsByStatusAccount">
    <WorkspaceMaterialsList />
  </div>
</template>

<script>
import notifications from '@/mixins/notifications'

export default {
  name: 'WorkspaceMaterialsView',
  components: {
    WorkspaceMaterialsList: () =>
      import(
        /* webpackChunkName: "WorkspaceMaterialsList" */ './components/workspace-materials-list.vue'
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
      inner: 'Gestión de Materiales'
    }
  }
}
</script>
