<template>
  <LessonsAttendeesDatatable />
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'LessonsAttendeesView',
  components: {
    LessonsAttendeesDatatable: () =>
      import(
        /* webpackChunkName: "DatatableStudents" */ './components/lesson-attendees-list.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  beforeCreate() {
    this?.$hasPermission(PermissionEnum.SEE_LESSON_PARTICIPANTS)
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
