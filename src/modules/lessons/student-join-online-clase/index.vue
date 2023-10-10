<template>
  <div>
    <StudentsOnlineLesson />
  </div>
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'StudentsOnlineLessonView',
  components: {
    StudentsOnlineLesson: () =>
      import(
        /* webpackChunkName: "StudentsOnlineLesson" */ './students-online-lesson.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      PermissionEnum
    }
  },
  mounted() {
    this.loadNotifications()
  },

  beforeCreate() {
    this.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
    this.$hasPermissionMiddleware(PermissionEnum.SEE_ONLINE_LESSON)
  },
  head: {
    title: {
      inner: 'Clase Virtual'
    }
  }
}
</script>
