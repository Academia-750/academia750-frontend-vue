import { mapState, mapMutations, mapActions } from 'vuex'
import DatatableManageStudents from '../../mixins/DatatableManageStudents'
import notifications from '@/mixins/notifications'

export default {
  name: 'StudentsView',
  mixins: [
    DatatableManageStudents,
    notifications
  ],
  components: {
    StudentsDatatable: () => import(/* webpackChunkName: "StudentsDatatableStudentsModule" */ '../../components/datatable/Students.vue'),
    CreateOrEditStudent: () => import(/* webpackChunkName: "CreateOrEditStudentStudentsModule" */ '../../components/CreateOrEditStudents/CreateOrEditStudents.vue'),
    FormActionsButtons: () => import(/* webpackChunkName: "FormActionsButtonsStudentsModule" */'@/modules/students/components/form/FormActionsButtons.vue')
  },
  data () {
    return {
      reloadDatatableUsers: false
    }
  },
  computed: {
    ...mapState('studentsService', ['tabViewStudents']),
    getCurrentTabView: {
      get () {
        return this.tabViewStudents
      },
      set (value) {
        this.SET_TAB_VIEW_STUDENTS(value)
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
    tabViewStudents () {
      //this.loadStudentsFromCurrentTab()

      console.log('Se ha detectado un cambio en los Tabs')

      this.$refs['sectionTabsItemsStudentsByStatusAccount'].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
  methods: {
    ...mapMutations('studentsService', ['SET_TAB_VIEW_STUDENTS', 'SET_MATCHES_RESET_OPTIONS_DATATABLE']),
    ...mapActions('studentsService', ['getStudents']),
    ScrollToCreateOrEditStudentForm () {
      this.$refs['CreateOrEditStudentSection'].scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    ReloadDatatableStudents () {

      //this.loadStudentsFromCurrentTab(this.getCurrentTabView)

      this.SET_MATCHES_RESET_OPTIONS_DATATABLE(true)

      /* if (this.getCurrentTabView === 'students-account-enable') {
        this.SET_TAB_VIEW_STUDENTS(null)
        this.SET_TAB_VIEW_STUDENTS('students-account-disable')
        this.SET_TAB_VIEW_STUDENTS('students-account-enable')
      }

      if (this.getCurrentTabView === 'students-account-disable') {
        this.SET_TAB_VIEW_STUDENTS(null)
        this.SET_TAB_VIEW_STUDENTS('students-account-enable')
        this.SET_TAB_VIEW_STUDENTS('students-account-disable')
      } */

      //this.$refs['sectionTabsItemsStudentsByStatusAccount'].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
  head: {
    title: {
      inner: 'Gestion de alumnos'
    }
  }
}
