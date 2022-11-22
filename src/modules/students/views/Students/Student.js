import { mapState, mapMutations } from 'vuex'

export default {
  name: 'StudentsView',
  components: {
    StudentsDatatable: () => import(/* webpackChunkName: "StudentsDatatable" */ '../../components/datatable/Students.vue'),
    CreateOrEditStudent: () => import(/* webpackChunkName: "CreateOrEditStudent" */ '../../components/CreateOrEditStudents/CreateOrEditStudents.vue')
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
  methods: {
    ...mapMutations('studentsService', ['SET_TAB_VIEW_STUDENTS'])
  },
  head: {
    title: {
      inner: 'Gestion de alumnos'
    }
  }
}
