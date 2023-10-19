<template>
  <StudentsMaterialsRecordingsList />
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'StudentsMaterialsRecordings',
  components: {
    StudentsMaterialsRecordingsList: () =>
      import(
        /* webpackChunkName: "StudentsMaterialsRecordingsList" */ './students-materials-recordings-list.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
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
