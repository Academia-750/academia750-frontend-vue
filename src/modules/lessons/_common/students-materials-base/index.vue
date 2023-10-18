<template>
  <StudentsMaterialsBaseList />
</template>
  
  <script>
  import notifications from '@/mixins/notifications'
  import { PermissionEnum } from '@/utils/enums'
  
  export default {
    name: 'StudentsMaterialsBase',
    components: {
      StudentsMaterialsBaseList: () =>
        import(
          /* webpackChunkName: "StudentsMaterialsList" */ './students-materials-base.vue'
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
