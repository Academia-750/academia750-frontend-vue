export default {
  name: 'StudentsView',
  components: {
    StudentsDatatable: () => import(/* webpackChunkName: "StudentsDatatable" */ '../../components/datatable/Students.vue')
  },
  data () {
    return {
      tab: null
    }
  },
  head: {
    title: {
      inner: 'Gestion de alumnos'
    }
  }
}
