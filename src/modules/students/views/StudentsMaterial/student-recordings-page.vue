<template>
  <v-card-text>
    <div>
      <v-card flat>
        <v-card-text>
          <StudentsMaterialsList />
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'StudentsMaterialsList',
  components: {
    StudentsMaterialsList: () =>
      import(/* webpackChunkName: "StudentsMaterialsList" */ './components/students-materials-list.vue')
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
  head: {
    title: {
      inner: 'Estudiante Materiales'
    }
  }
}
</script>
