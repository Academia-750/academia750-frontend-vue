<template>
  <StudentsAssessmentsList store-name="studentsAssessmentsStore" />
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'StudentsAssessments',
  components: {
    StudentsAssessmentsList: () =>
      import(
        /* webpackChunkName: "StudentsAssessmentsList" */ './students-assessments-list.vue'
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
      inner: 'Seguimiento Teórico'
    }
  }
}
</script>
