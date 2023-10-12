<template>
  <StudentsRecordingsList />
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'StudentsRecordings',
  components: {
    StudentsRecordingsList: () =>
      import(
        /* webpackChunkName: "StudentsRecordingsList" */ './students-recordings-list.vue'
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
      inner: 'Grabaciones de clase'
    }
  }
}
</script>
