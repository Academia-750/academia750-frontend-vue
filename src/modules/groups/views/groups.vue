<template>
  <v-card-text>
    <div ref="sectionTabsItemsGroupsByStatusAccount">
      <v-card flat>
        <v-card-text>
          <groups-datatable />
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import DatatableManageGroups from '../mixins/DatatableManageGroups'
import notifications from '@/mixins/notifications'

export default {
  name: 'GroupsView',
  components: {
    GroupsDatatable: () =>
      import(
        /* webpackChunkName: "DatatableGroups" */ '../components/datatable/groups-list.vue'
      )
  },
  mixins: [DatatableManageGroups, notifications],
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
      inner: 'Gestión de grupos'
    }
  }
}
</script>
