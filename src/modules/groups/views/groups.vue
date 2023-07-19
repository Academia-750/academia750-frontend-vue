<template>
  <v-card-text>
    <div ref="sectionTabsItemsGroupsByStatusAccount">
      <v-card flat>
        <v-card-text>
          <groups-datatable />
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import DatatableManageGroups from '../mixins/DatatableManageGroups'
import notifications from '@/mixins/notifications'

export default {
  name: 'GroupsView',
  components: {
    GroupsDatatable: () =>
      import(
        /* webpackChunkName: "DatatableGroups" */ '../components/datatable/Groups.vue'
      )
    // CreateOrEditStudent: () =>
    //   import(
    //     /* webpackChunkName: "CreateOrEditStudentStudentsModule" */ '../../components/CreateOrEditGroups/CreateOrEditGroups.vue'
    //   ),
  },
  mixins: [DatatableManageGroups, notifications],
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  computed: {
    ...mapState('groupsService')
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted() {
    this.loadNotifications()
  },
  methods: {
    ...mapMutations('groupsService', [
      'SET_TAB_VIEW_GROUPS',
      'SET_MATCHES_RESET_OPTIONS_DATATABLE'
    ]),
    ...mapActions('groupsService', ['getGroups']),
    ReloadDatatableGroups() {
      this.loadGroupsFromCurrentTab()
    }
  },
  head: {
    title: {
      inner: 'Gestión de grupos'
    }
  }
}
</script>
