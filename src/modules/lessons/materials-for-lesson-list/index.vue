<template>
  <LessonMaterialsList />
</template>

<script>
import notifications from '@/mixins/notifications'

export default {
  name: 'LessonMaterialsView',
  components: {
    LessonMaterialsList: () =>
      import(
        /* webpackChunkName: "LessonMaterialsList" */ './components/materials-lesson-list.vue'
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
