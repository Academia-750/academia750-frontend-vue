import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('studentsService', ['currentUserForUpdate', 'tabViewStudents']),
    checkIfThereIsAtLeast_1ModifiedData () {
      const { firstName, lastName, phone, email } = this.cache.data.student

      return (firstName !== this.form.firstName) || (lastName !== this.form.lastName) || (phone !== this.form.phone) || (email !== this.form.email)
    },
    textButtonCancelDataEditStudent () {
      return this.isUpdateStudent ? 'Revertir cambios' : 'Cancelar proceso'
    },
    cancelProcessFormStudent () {
      return this.form.dni || this.form.firstName || this.form.lastName || this.form.phone || this.form.email
    },
    getTitleByUserDataForUpdateOrCreate () {
      return this.currentUserForUpdate === null ? 'Crear alumno' : 'Editar alumno'
    },
    activeStyleBlockButton () {
      return this.$vuetify.breakpoint.width <= 600
    },
    isUpdateUser () {
      return this.currentUserForUpdate !== null
    }
  }
}
