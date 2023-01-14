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
      this.loadStudentsFromCurrentTab()
      console.log(this.$refs['studentsDatatableStateEnable'])
      console.log(this.$refs['studentsDatatableStateDisable'])
    }
  },
  methods: {
    ...mapMutations('studentsService', ['SET_TAB_VIEW_STUDENTS']),
    ...mapActions('studentsService', ['getStudents']),
    ScrollToCreateOrEditStudentForm () {
      this.$refs['CreateOrEditStudentSection'].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
  head: {
    title: {
      inner: 'Gestion de alumnos'
    }
  }
}
