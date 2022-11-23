import { mapState, mapMutations, mapActions } from 'vuex'
import DatatableManageStudents from '../../mixins/DatatableManageStudents'

export default {
  name: 'StudentsView',
  mixins: [
    DatatableManageStudents
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
  mounted () {
  },
  watch: {
    tabViewStudents () {
      this.loadStudentsFromCurrentTab()
    }
  },
  methods: {
    ...mapMutations('studentsService', ['SET_TAB_VIEW_STUDENTS']),
    ...mapActions('studentsService', ['getStudents'])
  },
  head: {
    title: {
      inner: 'Gestion de alumnos'
    }
  }
}
