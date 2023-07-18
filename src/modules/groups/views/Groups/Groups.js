import { mapState, mapMutations, mapActions } from 'vuex'
import DatatableManageGroups from '../../mixins/DatatableManageGroups'
import notifications from '@/mixins/notifications'

export default {
  name: 'GroupsView',
  mixins: [DatatableManageGroups, notifications],
  components: {
    GroupsDatatable: () =>
      import(
        /* webpackChunkName: "GroupsDatatableStudentsModule" */ '../../components/datatable/Groups.vue'
      ),
    CreateOrEditStudent: () =>
      import(
        /* webpackChunkName: "CreateOrEditStudentStudentsModule" */ '../../components/CreateOrEditGroups/CreateOrEditGroups.vue'
      ),
    FormActionsButtons: () =>
      import(
        /* webpackChunkName: "FormActionsButtonsStudentsModule" */ '@/modules/groups/components/form/FormActionsButtons.vue'
      )
  },
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  computed: {
    ...mapState('groupsService', ['tabViewGroups']),
    getCurrentTabView: {
      get() {
        return this.tabViewGroups
      },
      set(value) {
        this.SET_TAB_VIEW_GROUPS(value)
      }
    }
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted() {
    this.loadNotifications()
  },
  watch: {
    tabViewGroups() {
      //this.loadStudentsFromCurrentTab()

      this.loadGroupsFromCurrentTab()
      /* this.loadStudentsFromCurrentTab()
      this.$refs['sectionTabsItemsStudentsByStatusAccount'].scrollIntoView({ behavior: 'smooth', block: 'start' }) */
    }
  },
  methods: {
    ...mapMutations('groupsService', [
      'SET_TAB_VIEW_GROUPS',
      'SET_MATCHES_RESET_OPTIONS_DATATABLE'
    ]),
    ...mapActions('groupsService', ['getGroups']),
    ScrollToCreateOrEditGroupForm() {
      this.$refs['CreateOrEditGroupSection'].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    },
    ReloadDatatableGroups() {
      this.loadGroupsFromCurrentTab()
    }
  },
  head: {
    title: {
      inner: 'Gestion de grupos'
    }
  }
}
