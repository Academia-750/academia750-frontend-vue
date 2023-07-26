<template>
  <v-card-text>
    <div ref="sectionTabsItemsGroupsByStatusAccount">
      <v-card flat>
        <v-card-text>
          <students-datatable />
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import DatatableManageStudents from '../../mixins/DatatableManageStudents'
import notifications from '@/mixins/notifications'

export default {
  name: 'StudentsView',
  components: {
    StudentsDatatable: () =>
      import(
        /* webpackChunkName: "DatatableStudents" */ '../../components/datatable/groups-students-list.vue'
      )
  },
  mixins: [DatatableManageStudents, notifications],
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
