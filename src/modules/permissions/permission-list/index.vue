<template>
  <v-card-text>
    <div ref="sectionTabsItemsGroupsByStatusAccount">
      <v-card flat>
        <v-card-text>
          <permissions-datatable />
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'

export default {
  name: 'PermissionsView',
  components: {
    PermissionsDatatable: () =>
      import(
        /* webpackChunkName: "PermissionsDatatable" */ './components/permissions-list.vue'
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
      inner: 'Gestión de permisos'
    }
  }
}
</script>
