<template>
  <tags-datatable />
</template>

<script>
import notifications from '@/mixins/notifications'

export default {
  name: 'TagsView',
  components: {
    TagsDatatable: () =>
      import(
        /* webpackChunkName: "TagsDatatable" */ './components/tags-list.vue'
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
      inner: 'Gestión de tags'
    }
  }
}
</script>
