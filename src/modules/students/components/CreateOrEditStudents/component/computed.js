import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('studentsService', ['currentUserForUpdate', 'tabViewStudents']),
    getTitleByUserDataForUpdateOrCreate () {
      return this.currentUserForUpdate === null ? 'Crear alumno' : 'Editar alumno'
    },
    activeStyleBlockButton () {
      return this.$vuetify.breakpoint.width <= 600
    }
  }
}
