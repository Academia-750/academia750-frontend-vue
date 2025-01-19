<template>
  <LessonMaterialsList />
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'
export default {
  name: 'LessonMaterialsView',
  components: {
    LessonMaterialsList: () =>
      import(
        /* webpackChunkName: "LessonMaterialsList" */ './components/search-materials-list.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  beforeCreate() {
    this?.$hasRolesOrPermissions(
      ['admin'],
      [PermissionEnum.UPDATE_LESSON_MATERIALS]
    )
  },
  mounted() {
    this.loadNotifications()
  },
  head: {
    title: {
      inner: 'Gestión de materiales'
    }
  }
}
</script>
