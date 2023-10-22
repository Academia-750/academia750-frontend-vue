<template>
  <StudentsMaterialsList store-name="studentsMaterialsStore" />
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'StudentsMaterials',
  components: {
    StudentsMaterialsList: () =>
      import(
        /* webpackChunkName: "StudentsMaterialsList" */ './students-materials-list.vue'
      )
  },
  mixins: [notifications],
  mounted() {
    this.loadNotifications()
  },

  beforeCreate() {
    this.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
    this.$hasPermissionMiddleware(PermissionEnum.SEE_LESSON_MATERIALS)
  },
  head: {
    title: {
      inner: 'Materiales de clase'
    }
  }
}
</script>
