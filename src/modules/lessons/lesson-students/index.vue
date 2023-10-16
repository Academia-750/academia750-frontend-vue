<template>
  <students-datatable />
</template>

<script>
import notifications from '@/mixins/notifications'

export default {
  name: 'StudentsView',
  components: {
    StudentsDatatable: () =>
      import(
        /* webpackChunkName: "DatatableStudents" */ './components/lesson-students-list.vue'
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
      inner: 'Gestión de alumnos'
    }
  }
}
</script>
