<template>
  <profiles-datatable />
</template>

<script>
import notifications from '@/mixins/notifications'

export default {
  name: 'ProfilesView',
  components: {
    ProfilesDatatable: () =>
      import(
        /* webpackChunkName: "ProfilesDatatable" */ './components/profiles-list.vue'
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
