<template>
  <GroupList />
</template>

<script>
import notifications from '@/mixins/notifications'

export default {
  name: 'GroupsView',
  components: {
    GroupList: () =>
      import(/* webpackChunkName: "GroupList" */ './components/groups-list.vue')
  },
  mixins: [notifications],
  data() {
    return {}
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted() {
    this.loadNotifications()
  },
  head: {
    title: {
      inner: 'Gestión de grupos'
    }
  }
}
</script>
